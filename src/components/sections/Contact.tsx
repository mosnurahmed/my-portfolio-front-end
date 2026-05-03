"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Section } from "@/components/ui/Section";
import { profile } from "@/lib/data";
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/contact`, form);
      toast.success("Message sent — I'll get back to you soon!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error("Couldn't send. Email me directly?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="Get in touch"
      title={
        <>
          Let's build something <span className="text-gradient-anim">great</span>.
        </>
      }
      description="Got a role, a product idea, or a freelance project? Drop a message — I usually reply within a day."
    >
      <div className="grid lg:grid-cols-5 gap-3 md:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 card p-6 md:p-8 flex flex-col justify-between"
        >
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight">
              Reach me directly
            </h3>
            <p className="mt-2 text-sm text-white/60">
              Or pick the channel that suits you best.
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 hover:bg-white/[0.05] transition"
                >
                  <Mail className="h-4 w-4 text-accent-cyan" />
                  <span className="text-white/85 group-hover:text-white">
                    {profile.email}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${profile.phone.replace(/\s/g, "")}`}
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 hover:bg-white/[0.05] transition"
                >
                  <Phone className="h-4 w-4 text-accent-violet" />
                  <span className="text-white/85 group-hover:text-white">
                    {profile.phone}
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                <MapPin className="h-4 w-4 text-accent-pink" />
                <span className="text-white/75">{profile.location}</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-3 card p-6 md:p-8 space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
            <Field
              label="Name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              placeholder="Your full name"
            />
            <Field
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              placeholder="you@company.com"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.18em] text-white/45 mb-1.5">
              Message
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={6}
              placeholder="Tell me about your project, role or idea…"
              className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-violet-400/50 focus:ring-2 focus:ring-violet-400/20 transition resize-none"
            />
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-white/40">
              I respect your privacy — no spam, ever.
            </span>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
              {loading ? "Sending…" : "Send message"}
            </button>
          </div>
        </motion.form>
      </div>
    </Section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.18em] text-white/45 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-violet-400/50 focus:ring-2 focus:ring-violet-400/20 transition"
      />
    </div>
  );
}
