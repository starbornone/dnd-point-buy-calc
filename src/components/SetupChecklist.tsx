
import { useMessages } from "@/context/LocaleContext";

export const SetupChecklist = ({
  choices,
  count = choices.length,
}: {
  choices: readonly { id: string; label: string }[];
  count?: number;
}) => {
  const copy = useMessages();

  return (
    <div className="col-span-full rounded-md border border-border bg-muted p-2.5 text-sm">
      <p role="status" className="font-semibold">
        {count ? copy.setupChoicesRemaining(count) : copy.setupChoicesComplete}
      </p>
      {choices.length > 0 && (
        <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
          {choices.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="inline-flex min-h-8 items-center rounded-sm text-primary underline underline-offset-4 hover:decoration-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                onClick={(event) => {
                  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
                  const target = document.getElementById(id);
                  const control = target instanceof HTMLFieldSetElement
                    ? target.querySelector<HTMLInputElement>("input:not(:checked):not(:disabled)")
                    : target;
                  if (control) {
                    event.preventDefault();
                    control.focus();
                  }
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
