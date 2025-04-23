import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  isOrganizer: boolean("is_organizer").default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullName: true,
  isOrganizer: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Event Types
export const eventTypes = pgTable("event_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const insertEventTypeSchema = createInsertSchema(eventTypes).pick({
  name: true,
  description: true,
  imageUrl: true,
});

export type InsertEventType = z.infer<typeof insertEventTypeSchema>;
export type EventType = typeof eventTypes.$inferSelect;

// Events
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  location: text("location").notNull(),
  price: integer("price").notNull(),
  imageUrl: text("image_url").notNull(),
  eventTypeId: integer("event_type_id").notNull(),
  organizerId: integer("organizer_id").notNull(),
});

export const insertEventSchema = createInsertSchema(events).pick({
  title: true,
  description: true,
  date: true,
  time: true,
  location: true,
  price: true,
  imageUrl: true,
  eventTypeId: true,
  organizerId: true,
});

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

// Cart Items
export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  eventId: integer("event_id").notNull(),
  quantity: integer("quantity").notNull().default(1),
});

export const insertCartItemSchema = createInsertSchema(cartItems).pick({
  userId: true,
  eventId: true,
  quantity: true,
});

export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type CartItem = typeof cartItems.$inferSelect;

// Registrations
export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  eventId: integer("event_id").notNull(),
  registrationDate: timestamp("registration_date").notNull().defaultNow(),
});

export const insertRegistrationSchema = createInsertSchema(registrations).pick({
  userId: true,
  eventId: true,
});

export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;
export type Registration = typeof registrations.$inferSelect;
