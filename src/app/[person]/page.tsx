// Dynamic route for each person's card
import React from 'react';
import HolographicCard from '../components/HolographicCard';
import { notFound } from 'next/navigation'; 

// Define valid people
const VALID_PEOPLE = ['mitul', 'zahra'];

export default function PersonCard({ params }: { params: { person: string } }) {
  // Validate person exists
  if (!VALID_PEOPLE.includes(params.person)) {
    notFound();
  }

  return <HolographicCard person={params.person} />;
}

// Generate static paths
export function generateStaticParams() {
  return VALID_PEOPLE.map((person) => ({
    person: person,
  }));
} 