import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

export async function POST(req: NextRequest) {
  if (!N8N_WEBHOOK_URL) {
    console.error("N8N_WEBHOOK_URL not configured");
    return NextResponse.json(
      { message: "Service temporairement indisponible. Contactez-nous sur WhatsApp." },
      { status: 503 }
    );
  }

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Requête invalide" }, { status: 400 });
  }

  const { nomPrenom, whatsapp, secteur, taille, probleme } = body;

  if (!nomPrenom || !whatsapp || !secteur || !taille || !probleme) {
    return NextResponse.json(
      { message: "Tous les champs sont obligatoires" },
      { status: 422 }
    );
  }

  const payload = {
    nom_prenom: nomPrenom.trim(),
    whatsapp: whatsapp.trim(),
    secteur: secteur.trim(),
    nombre_employes: taille.trim(),
    probleme_principal: probleme.trim(),
    source: "symoafrica.com/diagnostic",
    soumis_le: new Date().toISOString(),
  };

  try {
    const n8nRes = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!n8nRes.ok) {
      console.error("n8n webhook error:", n8nRes.status, await n8nRes.text());
      return NextResponse.json(
        { message: "Erreur lors de l'envoi. Réessayez dans quelques instants." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("n8n fetch error:", err);
    return NextResponse.json(
      { message: "Erreur réseau. Vérifiez votre connexion et réessayez." },
      { status: 503 }
    );
  }
}
