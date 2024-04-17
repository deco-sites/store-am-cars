import { HTMLWidget } from "apps/admin/widgets.ts";
import Section, {
  type Props as SectionHeaderProps,
} from "../../components/ui/Section.tsx";

export interface Question {
  question: string;

  answer: HTMLWidget;
}

export interface Contact {
  title?: string;
  description?: HTMLWidget;
  link?: {
    text: string;
    href: string;
  };
}

export interface Props extends SectionHeaderProps {
  questions?: Question[];
  contact?: Contact;
}

function Question({ question, answer }: Question) {
  return (
    <details class="collapse collapse-arrow border-t border-base-200">
      <summary class="collapse-title text-lg font-medium">
        {question}
      </summary>
      <div
        class="collapse-content"
        dangerouslySetInnerHTML={{ __html: answer }}
      />
    </details>
  );
}

function Contact({ title, description, link }: Contact) {
  return (
    <div class="flex flex-col gap-6 items-center text-center">
      <div class="flex flex-col gap-2">
        {title && <h2 class="text-xl lg:text-3xl">{title}</h2>}
        {description && (
          <div
            class="text-lg lg:text-xl"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </div>
      {link &&
        <a href={link.href} class="btn">{link.text}</a>}
    </div>
  );
}

export default function FAQ({
  title,
  cta,
  questions = [
    {
      question: "¿Cómo funciona el proceso de tasación (trade-in)?",
      answer:
        "Compártenos los datos de tu vehículo y te daremos una oferta transparente. Si aceptas, gestionamos la documentación y aplicamos el valor a tu compra.",
    },
    {
      question: "¿Qué necesito para solicitar financiación?",
      answer:
        "Normalmente necesitamos DNI/NIE, justificante de ingresos y un recibo reciente. Te acompañamos en la preaprobación en menos de 24 horas.",
    },
  ],
  contact = {
    title: "",
    description: "",
    link: {
      text: "",
      href: "",
    },
  },
}: Props) {
  return (
    <Section.Container>
      <Section.Header title={title} cta={cta} />

      <ul class="w-full">
        <li>
          {questions.map((question) => <Question {...question} />)}
        </li>
      </ul>

      <Contact {...contact} />
    </Section.Container>
  );
}
