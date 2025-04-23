import { 
  users, type User, type InsertUser,
  events, type Event, type InsertEvent,
  eventTypes, type EventType, type InsertEventType,
  cartItems, type CartItem, type InsertCartItem,
  registrations, type Registration, type InsertRegistration
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Event type operations
  getEventTypes(): Promise<EventType[]>;
  getEventType(id: number): Promise<EventType | undefined>;
  createEventType(eventType: InsertEventType): Promise<EventType>;
  
  // Event operations
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  getEventsByType(eventTypeId: number): Promise<Event[]>;
  getEventsByOrganizer(organizerId: number): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: number): Promise<boolean>;
  
  // Cart operations
  getCartItems(userId: number): Promise<CartItem[]>;
  getCartItem(id: number): Promise<CartItem | undefined>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  removeFromCart(id: number): Promise<boolean>;
  clearCart(userId: number): Promise<boolean>;
  
  // Registration operations
  getRegistrations(userId: number): Promise<Registration[]>;
  register(registration: InsertRegistration): Promise<Registration>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private events: Map<number, Event>;
  private eventTypes: Map<number, EventType>;
  private cartItems: Map<number, CartItem>;
  private registrations: Map<number, Registration>;
  
  sessionStore: session.SessionStore;
  
  private userIdCounter: number;
  private eventIdCounter: number;
  private eventTypeIdCounter: number;
  private cartItemIdCounter: number;
  private registrationIdCounter: number;

  constructor() {
    this.users = new Map();
    this.events = new Map();
    this.eventTypes = new Map();
    this.cartItems = new Map();
    this.registrations = new Map();
    
    this.userIdCounter = 1;
    this.eventIdCounter = 1;
    this.eventTypeIdCounter = 1;
    this.cartItemIdCounter = 1;
    this.registrationIdCounter = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000
    });
    
    // Initialize with default event types
    this.createEventType({
      name: "Wedding",
      description: "Traditional Nepali wedding ceremonies with cultural rituals and celebrations.",
      imageUrl: "https://www.shutterstock.com/shutterstock/photos/1521756545/display_1500/stock-photo-a-beautiful-bride-in-a-marriage-ceremony-at-kathmandu-nepal-she-is-wearing-her-red-cultural-sari-1521756545.jpg"
    });
    
    this.createEventType({
      name: "Bratabandha",
      description: "Coming of age ritual for boys in Nepali Hindu tradition with sacred ceremonies.",
      imageUrl: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/7bcdb7169212483.6448e308013b9.jpg"
    });
    
    this.createEventType({
      name: "Pasni",
      description: "Rice feeding ceremony for babies, an important milestone in Nepali culture.",
      imageUrl: "https://www.bihebazaar.com/uploads/2022/10/rice-feeding.jpg"
    });
    
    // Add sample events for the three main Nepali cultural ceremonies
    this.createEvent({
      title: "Traditional Nepali Wedding",
      description: "Experience an authentic Nepali wedding ceremony with traditional rituals including Janti (wedding procession), Swayambar (bride choosing the groom), Sindoor (vermillion) ceremony, and festive celebrations with traditional music and dancing.",
      date: "",
      time: "",
      location: "",
      price: 5000,
      imageUrl: "https://www.shutterstock.com/shutterstock/photos/1521756545/display_1500/stock-photo-a-beautiful-bride-in-a-marriage-ceremony-at-kathmandu-nepal-she-is-wearing-her-red-cultural-sari-1521756545.jpg",
      eventTypeId: 1,
      organizerId: 1
    });
    
    this.createEvent({
      title: "Bratabandha Ceremony",
      description: "Join us for a sacred Bratabandha ceremony, the coming-of-age ritual for boys in Nepali Hindu tradition. This ceremony includes the sacred thread (Janai) bestowing, head-shaving ritual, and Vedic rites performed by experienced priests.",
      date: "",
      time: "",
      location: "",
      price: 3500,
      imageUrl: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/7bcdb7169212483.6448e308013b9.jpg",
      eventTypeId: 2,
      organizerId: 1
    });
    
    this.createEvent({
      title: "Pasni Rice Feeding Ceremony",
      description: "Celebrate your baby's rice feeding ceremony with traditional Nepali customs. The Pasni marks a child's first solid food at either 5 months (girls) or 6 months (boys) with blessings from elders, offerings to deities, and traditional attire.",
      date: "",
      time: "",
      location: "",
      price: 2500,
      imageUrl: "https://www.bihebazaar.com/uploads/2022/10/rice-feeding.jpg",
      eventTypeId: 3,
      organizerId: 1
    });
    

  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(userData: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...userData, id };
    this.users.set(id, user);
    return user;
  }
  
  // Event type operations
  async getEventTypes(): Promise<EventType[]> {
    return Array.from(this.eventTypes.values());
  }
  
  async getEventType(id: number): Promise<EventType | undefined> {
    return this.eventTypes.get(id);
  }
  
  async createEventType(eventTypeData: InsertEventType): Promise<EventType> {
    const id = this.eventTypeIdCounter++;
    const eventType: EventType = { ...eventTypeData, id };
    this.eventTypes.set(id, eventType);
    return eventType;
  }
  
  // Event operations
  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }
  
  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }
  
  async getEventsByType(eventTypeId: number): Promise<Event[]> {
    return Array.from(this.events.values()).filter(
      (event) => event.eventTypeId === eventTypeId
    );
  }
  
  async getEventsByOrganizer(organizerId: number): Promise<Event[]> {
    return Array.from(this.events.values()).filter(
      (event) => event.organizerId === organizerId
    );
  }
  
  async createEvent(eventData: InsertEvent): Promise<Event> {
    const id = this.eventIdCounter++;
    const event: Event = { ...eventData, id };
    this.events.set(id, event);
    return event;
  }
  
  async updateEvent(id: number, eventData: Partial<InsertEvent>): Promise<Event | undefined> {
    const event = this.events.get(id);
    if (!event) return undefined;
    
    const updatedEvent: Event = { ...event, ...eventData };
    this.events.set(id, updatedEvent);
    return updatedEvent;
  }
  
  async deleteEvent(id: number): Promise<boolean> {
    return this.events.delete(id);
  }
  
  // Cart operations
  async getCartItems(userId: number): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      (item) => item.userId === userId
    );
  }
  
  async getCartItem(id: number): Promise<CartItem | undefined> {
    return this.cartItems.get(id);
  }
  
  async addToCart(cartItemData: InsertCartItem): Promise<CartItem> {
    // Check if the item is already in the cart
    const existingItem = Array.from(this.cartItems.values()).find(
      (item) => item.userId === cartItemData.userId && item.eventId === cartItemData.eventId
    );
    
    if (existingItem) {
      // Update quantity instead of adding new item
      const updatedItem: CartItem = { 
        ...existingItem, 
        quantity: existingItem.quantity + cartItemData.quantity 
      };
      this.cartItems.set(existingItem.id, updatedItem);
      return updatedItem;
    }
    
    const id = this.cartItemIdCounter++;
    const cartItem: CartItem = { ...cartItemData, id };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }
  
  async removeFromCart(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }
  
  async clearCart(userId: number): Promise<boolean> {
    const userItems = Array.from(this.cartItems.values()).filter(
      (item) => item.userId === userId
    );
    
    for (const item of userItems) {
      this.cartItems.delete(item.id);
    }
    
    return true;
  }
  
  // Registration operations
  async getRegistrations(userId: number): Promise<Registration[]> {
    return Array.from(this.registrations.values()).filter(
      (registration) => registration.userId === userId
    );
  }
  
  async register(registrationData: InsertRegistration): Promise<Registration> {
    const id = this.registrationIdCounter++;
    const registration: Registration = { 
      ...registrationData, 
      id, 
      registrationDate: new Date() 
    };
    this.registrations.set(id, registration);
    return registration;
  }
}

export const storage = new MemStorage();
