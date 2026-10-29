"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { IconCheck } from "@tabler/icons-react";
import FormField from "../forms/FormField";
import Input from "../forms/Input";
import Textarea from "../forms/Textarea";
import Heading from "../typography/Heading";
import Text from "../typography/Text";
import Button from "../ui/Button";

type Values = { name: string; email: string; phone: string; message: string };
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const empty: Values = { name: "", email: "", phone: "", message: "" };

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const onChange =
    (field: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setValues((v) => ({ ...v, [field]: value }));
      if (field !== "phone") setErrors((er) => (er[field] ? { ...er, [field]: undefined } : er));
    };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!values.name.trim()) next.name = t("nameError");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = t("emailError");
    if (values.message.trim().length < 10) next.message = t("messageError");
    setErrors(next);

    if (Object.keys(next).length > 0) {
      requestAnimationFrame(() =>
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      );
      return;
    }
    setSent(true); // mock
  }

  if (sent) {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex min-h-105 flex-col items-center justify-center gap-4 text-center"
      >
        <div className="bg-sage/20 flex h-14 w-14 items-center justify-center rounded-full">
          <IconCheck size={28} className="text-sage" aria-hidden="true" />
        </div>
        <Heading size="h2">{t("successHeading")}</Heading>
        <Text muted className="max-w-[320px]">
          {t("successBody")}
        </Text>
        <button
          type="button"
          onClick={() => {
            setValues(empty);
            setSent(false);
          }}
          className="text-pine mt-2 cursor-pointer text-sm font-medium tracking-wide underline-offset-4 hover:underline"
        >
          {t("another")}
        </button>
      </motion.div>
    );
  }

  return (
    <>
      <Heading size="h3" className="mb-2">
        {t("heading")}
      </Heading>
      <Text muted className="mb-8 text-pretty">
        {t("note")}
      </Text>

      <form ref={formRef} noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
        <FormField label={t("nameLabel")} required error={errors.name}>
          <Input name="name" autoComplete="name" value={values.name} onChange={onChange("name")} />
        </FormField>

        <FormField label={t("emailLabel")} required error={errors.email}>
          <Input
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={onChange("email")}
          />
        </FormField>

        <FormField label={t("phoneLabel")}>
          <Input
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={onChange("phone")}
          />
        </FormField>

        <FormField label={t("messageLabel")} required error={errors.message}>
          <Textarea name="message" rows={5} value={values.message} onChange={onChange("message")} />
        </FormField>

        <div className="pt-2">
          <Button type="submit">{t("submit")}</Button>
        </div>
      </form>
    </>
  );
}
