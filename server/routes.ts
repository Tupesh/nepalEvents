import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertEventSchema, insertCartItemSchema, insertRegistrationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Event Types routes
  app.get("/api/event-types", async (req, res) => {
    try {
      const eventTypes = await storage.getEventTypes();
      res.json(eventTypes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch event types" });
    }
  });

  app.get("/api/event-types/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const eventType = await storage.getEventType(id);
      if (!eventType) {
        return res.status(404).json({ message: "Event type not found" });
      }
      res.json(eventType);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch event type" });
    }
  });

  // Events routes
  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  app.get("/api/events/type/:eventTypeId", async (req, res) => {
    try {
      const eventTypeId = parseInt(req.params.eventTypeId);
      const events = await storage.getEventsByType(eventTypeId);
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch events by type" });
    }
  });

  app.get("/api/events/organizer/:organizerId", async (req, res) => {
    try {
      const organizerId = parseInt(req.params.organizerId);
      const events = await storage.getEventsByOrganizer(organizerId);
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch events by organizer" });
    }
  });

  app.get("/api/events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const event = await storage.getEvent(id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch event" });
    }
  });

  // Protected routes - require authentication
  app.post("/api/events", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const user = req.user as Express.User;
      if (!user.isOrganizer) {
        return res.status(403).json({ message: "Only organizers can create events" });
      }

      const validatedData = insertEventSchema.parse({
        ...req.body,
        organizerId: user.id,
      });

      const event = await storage.createEvent(validatedData);
      res.status(201).json(event);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid event data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create event" });
    }
  });

  app.put("/api/events/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const id = parseInt(req.params.id);
      const user = req.user as Express.User;
      const event = await storage.getEvent(id);

      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      if (event.organizerId !== user.id) {
        return res.status(403).json({ message: "You can only update your own events" });
      }

      const updatedEvent = await storage.updateEvent(id, req.body);
      res.json(updatedEvent);
    } catch (error) {
      res.status(500).json({ message: "Failed to update event" });
    }
  });

  app.delete("/api/events/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const id = parseInt(req.params.id);
      const user = req.user as Express.User;
      const event = await storage.getEvent(id);

      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      if (event.organizerId !== user.id) {
        return res.status(403).json({ message: "You can only delete your own events" });
      }

      await storage.deleteEvent(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete event" });
    }
  });

  // Cart routes
  app.get("/api/cart", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const user = req.user as Express.User;
      const cartItems = await storage.getCartItems(user.id);
      
      // Get full event details for each cart item
      const cartWithEventDetails = await Promise.all(
        cartItems.map(async (item) => {
          const event = await storage.getEvent(item.eventId);
          return {
            ...item,
            event
          };
        })
      );
      
      res.json(cartWithEventDetails);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const user = req.user as Express.User;
      const validatedData = insertCartItemSchema.parse({
        ...req.body,
        userId: user.id
      });

      const cartItem = await storage.addToCart(validatedData);
      
      // Get the event for the added cart item
      const event = await storage.getEvent(cartItem.eventId);
      
      res.status(201).json({
        ...cartItem,
        event
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid cart data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to add to cart" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const id = parseInt(req.params.id);
      await storage.removeFromCart(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to remove from cart" });
    }
  });

  app.delete("/api/cart", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const user = req.user as Express.User;
      await storage.clearCart(user.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  // Registration routes
  app.get("/api/registrations", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const user = req.user as Express.User;
      const registrations = await storage.getRegistrations(user.id);
      
      // Get full event details for each registration
      const registrationsWithEventDetails = await Promise.all(
        registrations.map(async (registration) => {
          const event = await storage.getEvent(registration.eventId);
          return {
            ...registration,
            event
          };
        })
      );
      
      res.json(registrationsWithEventDetails);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch registrations" });
    }
  });

  app.post("/api/register-event", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const user = req.user as Express.User;
      const validatedData = insertRegistrationSchema.parse({
        ...req.body,
        userId: user.id
      });

      const registration = await storage.register(validatedData);
      
      // Get the event for the registration
      const event = await storage.getEvent(registration.eventId);
      
      res.status(201).json({
        ...registration,
        event
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid registration data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to register for event" });
    }
  });

  // Checkout route (could be extended with payment integration)
  app.post("/api/checkout", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const user = req.user as Express.User;
      
      // Get all cart items
      const cartItems = await storage.getCartItems(user.id);
      
      // Register for each event in cart
      for (const item of cartItems) {
        await storage.register({
          userId: user.id,
          eventId: item.eventId
        });
      }
      
      // Clear the cart after successful checkout
      await storage.clearCart(user.id);
      
      res.status(200).json({ message: "Checkout successful" });
    } catch (error) {
      res.status(500).json({ message: "Checkout failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
