import { db } from '../setup/firebase-admin';
import { User } from '../models/user';
import { Address } from '../models/address';
import { PaymentCard } from '../models/payment_card';

export function generateUniqueEmail(email: string): string {
  return email.replace('@', `+${Date.now()}@`);
}

export async function getUser(key: string): Promise<User> {
  const doc = await db.collection('users').doc(key).get();
  if (!doc.exists) throw new Error(`Usuario "${key}" no encontrado en Firestore`);
  const data = doc.data() as User;
  if (!data.user || !data.password)
    throw new Error(`Datos incompletos para el usuario "${key}" en Firestore`);
  return data;
}

export async function getAddress(key: string): Promise<Address> {
  const doc = await db.collection('addresses').doc(key).get();
  if (!doc.exists) throw new Error(`Dirección "${key}" no encontrada en Firestore`);
  const data = doc.data() as Address;
  if (!data.country)
    throw new Error(`Datos incompletos para la dirección "${key}" en Firestore`);
  return data;
}

export async function getPaymentCard(key: string): Promise<PaymentCard> {
  const doc = await db.collection('paymentMethods').doc(key).get();
  if (!doc.exists) throw new Error(`Método de pago "${key}" no encontrado en Firestore`);
  const data = doc.data() as PaymentCard;
  if (!data.cardType || !data.cardNumber)
    throw new Error(`Datos incompletos para el método de pago "${key}" en Firestore`);
  return data;
}
