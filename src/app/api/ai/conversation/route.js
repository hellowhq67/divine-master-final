// pages/api/rayaMessage.js
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const messages = [
      "Welcome to DIVINE! I am Raya. How can I assist you today?",
      "Hello! I am Raya. How can I help you today?",
      "Hi there! I am Raya. What can I do for you today?",
      "Greetings! I am Raya. How can I be of service today?",
      "Welcome! I am Raya. How can I make your shopping experience better today?"
    ];

    const options = [
      { id: 'latestOffers', label: 'Latest Offers' },
      { id: 'bestDiscounts', label: 'Best Discounts' },
      { id: 'events', label: 'Events' },
      { id: 'freeShipping', label: 'Free Shipping News' },
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    return NextResponse.json({ message: randomMessage, options });
  } catch (error) {
    console.error('Error fetching message:', error);
    return NextResponse.error(error);
  }
}
