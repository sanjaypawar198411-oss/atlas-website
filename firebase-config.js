// Victor AI - Firebase Firestore & Auth Integration (vision-f1e0d, database: default)
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBl3CweKBE8N-T-iblsY_tvh4uHj1x_bJQ",
  authDomain: "vision-f1e0d.firebaseapp.com",
  projectId: "vision-f1e0d",
  storageBucket: "vision-f1e0d.firebasestorage.app",
  messagingSenderId: "178034598839",
  appId: "1:178034598839:web:439c7bd48f1e08938e3e32",
  measurementId: "G-EYV0QE4ZPQ"
};

const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${FIREBASE_CONFIG.projectId}/databases/default/documents`;

/**
 * Submit lifetime license registration & order directly to Firestore users collection
 */
export async function submitLifetimeOrder(userData) {
  const normalizedEmail = String(userData.email || '').trim().toLowerCase();
  if (!normalizedEmail) throw new Error("A valid Gmail address is required.");

  const orderId = "VICTOR AI-" + Date.now().toString(36).toUpperCase();
  const orderData = {
    name: String(userData.name || '').trim(),
    email: normalizedEmail,
    whatsapp: String(userData.whatsapp || '').trim(),
    country: 'India',
    plan: "lifetime",
    licenseType: "byok",
    approved: false,
    status: "pending_approval",
    paymentMethod: userData.paymentMethod || "PhonePe / Paytm UPI",
    transactionId: String(userData.transactionId || '').trim(),
    amount: "₹3,999 / $49",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    orderId: orderId
  };

  // Convert to Firestore REST field format
  const fields = {
    name: { stringValue: orderData.name },
    email: { stringValue: orderData.email },
    whatsapp: { stringValue: orderData.whatsapp },
    country: { stringValue: orderData.country },
    plan: { stringValue: orderData.plan },
    licenseType: { stringValue: orderData.licenseType },
    approved: { booleanValue: false },
    status: { stringValue: orderData.status },
    paymentMethod: { stringValue: orderData.paymentMethod },
    transactionId: { stringValue: orderData.transactionId },
    amount: { stringValue: orderData.amount },
    registeredAt: { stringValue: orderData.createdAt },
    updatedAt: { stringValue: orderData.updatedAt },
    orderId: { stringValue: orderId }
  };

  // 1. Direct REST write to Firestore 'users' collection in 'default' database
  try {
    const url = `${FIRESTORE_BASE}/users/${encodeURIComponent(normalizedEmail)}?key=${FIREBASE_CONFIG.apiKey}`;
    const res = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields })
    });

    if (res.ok) {
      console.log(`[Firestore] Successfully created user ${normalizedEmail} in Firebase Console!`);
    } else {
      const errJson = await res.json().catch(() => ({}));
      console.warn(`[Firestore] Write response:`, res.status, errJson);
    }
  } catch (err) {
    console.error("[Firestore] Network error writing to Firebase:", err.message);
  }

  // 2. Local fallback cache
  try {
    const existing = JSON.parse(localStorage.getItem("stonic_users_fallback") || '{}');
    existing[normalizedEmail] = orderData;
    localStorage.setItem("stonic_users_fallback", JSON.stringify(existing));
  } catch {}

  return { success: true, email: normalizedEmail, orderId };
}

/**
 * Check if a user's Gmail has been approved by Punit Pawar in Firebase Console
 */
export async function checkUserApproval(email) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  if (!normalizedEmail) return { found: false, approved: false };

  try {
    const url = `${FIRESTORE_BASE}/users/${encodeURIComponent(normalizedEmail)}?key=${FIREBASE_CONFIG.apiKey}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      const fields = data.fields || {};
      const isApproved = fields.approved?.booleanValue === true || fields.status?.stringValue === 'approved';
      return {
        found: true,
        approved: isApproved,
        plan: fields.plan?.stringValue || 'lifetime',
        user: fields
      };
    }
  } catch (err) {
    console.warn("[Firestore] Query error:", err.message);
  }

  // Local fallback
  try {
    const existing = JSON.parse(localStorage.getItem("stonic_users_fallback") || '{}');
    if (existing[normalizedEmail]) {
      const local = existing[normalizedEmail];
      return {
        found: true,
        approved: Boolean(local.approved === true || local.status === 'approved'),
        plan: local.plan || 'lifetime',
        user: local
      };
    }
  } catch {}

  return { found: false, approved: false };
}
