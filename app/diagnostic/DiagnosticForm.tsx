"use client";

import { useState } from "react";

const SECTEURS = [
  "Agriculture & Agroalimentaire",
  "BTP & Immobilier",
  "Commerce & Distribution",
  "Conseil & Services",
  "Education & Formation",
  "Finance & Assurance",
  "Industrie & Manufacture",
  "Santé",
  "Technologie & Digital",
  "Transport & Logistique",
  "Autre",
];

const TAILLES = [
  "1 (Solo / Freelance)",
  "2–5 employés",
  "6–20 employés",
  "21–50 employés",
  "51–200 employés",
  "200+ employés",
];

const PROBLEMES = [
  "Manque de clients / leads",
  "Processus internes trop lents",
  "Difficultés de financement",
  "Gestion des équipes complexe",
  "Faible visibilité digitale",
  "Transformation numérique à initier",
  "Problèmes de trésorerie",
  "Autre",
];

type Status = "idle" | "loading" | "success" | "error";

export default function DiagnosticForm() {
  const [form, setForm] = useState({
    nomPrenom: "",
    whatsapp: "",
    secteur: "",
    taille: "",
    probleme: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/submit-diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Erreur serveur");
      }

      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Une erreur est survenue. Réessayez."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-12 px-4">
        <div className="w-16 h-16 bg-[#e8f5ee] rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-[#1f9460]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Diagnostic reçu !
        </h2>
        <p className="text-gray-600 mb-6 max-w-sm mx-auto">
          Merci. Notre équipe analyse votre situation et vous contacte sur WhatsApp
          dans les <strong>24 heures</strong>.
        </p>
        <p className="text-sm text-gray-400">
          Un email de confirmation vous a été envoyé.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <p className="text-sm text-gray-500 mb-5">
          Remplissez ce formulaire pour recevoir votre diagnostic personnalisé.
          Tous les champs sont obligatoires.
        </p>
      </div>

      {/* Prénom + Nom */}
      <div>
        <label htmlFor="nomPrenom" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Prénom & Nom <span className="text-red-500">*</span>
        </label>
        <input
          id="nomPrenom"
          name="nomPrenom"
          type="text"
          required
          placeholder="Ex: Mamadou Diallo"
          value={form.nomPrenom}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1f9460] focus:border-transparent transition"
        />
      </div>

      {/* WhatsApp */}
      <div>
        <label htmlFor="whatsapp" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Numéro WhatsApp <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm select-none">
            +
          </span>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            required
            placeholder="224 620 000 000"
            value={form.whatsapp}
            onChange={handleChange}
            className="w-full pl-7 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1f9460] focus:border-transparent transition"
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">Format international. Ex: +224 620 000 000</p>
      </div>

      {/* Secteur */}
      <div>
        <label htmlFor="secteur" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Secteur d&apos;activité <span className="text-red-500">*</span>
        </label>
        <select
          id="secteur"
          name="secteur"
          required
          value={form.secteur}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#1f9460] focus:border-transparent transition appearance-none"
        >
          <option value="" disabled>Choisissez votre secteur</option>
          {SECTEURS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Taille */}
      <div>
        <label htmlFor="taille" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Nombre d&apos;employés <span className="text-red-500">*</span>
        </label>
        <select
          id="taille"
          name="taille"
          required
          value={form.taille}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#1f9460] focus:border-transparent transition appearance-none"
        >
          <option value="" disabled>Sélectionnez la taille</option>
          {TAILLES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Problème */}
      <div>
        <label htmlFor="probleme" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Principal problème business <span className="text-red-500">*</span>
        </label>
        <select
          id="probleme"
          name="probleme"
          required
          value={form.probleme}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#1f9460] focus:border-transparent transition appearance-none"
        >
          <option value="" disabled>Quel est votre principal défi ?</option>
          {PROBLEMES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* Error */}
      {status === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
          {errorMsg}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[#1f9460] hover:bg-[#187a50] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors text-base shadow-sm"
      >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Envoi en cours…
          </span>
        ) : (
          "Obtenir mon diagnostic gratuit →"
        )}
      </button>

      <p className="text-center text-xs text-gray-400 pb-2">
        En soumettant ce formulaire, vous acceptez d&apos;être contacté par SymoAfrica.
        Aucun spam, promis.
      </p>
    </form>
  );
}
