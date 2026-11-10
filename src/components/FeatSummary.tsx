
import { useLocale, useMessages } from "@/context/LocaleContext";
import { featOptions } from "@/data/feats";
import { featRulesUrl, getFeatSummary } from "@/i18n/featSummaries";
import { abilityLabel, featLabel, originFeatLabel } from "@/i18n/names";
import { cn } from "@/lib/utils";
import { grantedFeatAbility } from "@/utils/calculateFeatBonus";
import type { RulesEdition } from "@/utils/origin2024";

export const FeatSummary = ({
  edition,
  feat,
  source,
  abilityChoice = "",
  className,
}: {
  edition: RulesEdition;
  feat: string;
  source: string;
  abilityChoice?: string;
  className?: string;
}) => {
  const { locale } = useLocale();
  const copy = useMessages();
  const summary = getFeatSummary(edition, feat, locale);
  const name = edition === "2014" ? featLabel(locale, feat) : originFeatLabel(locale, feat);
  const appliedAbility = edition === "2014" ? grantedFeatAbility(feat, abilityChoice) : "";
  const availableAbilities = edition === "2014" && !appliedAbility ? featOptions(feat) : [];

  return (
    <div className={cn("space-y-1 rounded-md border border-border bg-muted p-2.5 text-sm print:break-inside-avoid print:border-0 print:bg-transparent print:p-0", className)}>
      <p className="flex flex-wrap items-baseline gap-x-2">
        <strong className="text-primary print:text-inherit">{name}</strong>
        <span className="text-xs text-muted-foreground print:text-inherit">{source}</span>
      </p>
      {summary && <p>{summary}</p>}
      {appliedAbility && <p className="font-medium">{copy.featBonusApplied(abilityLabel(locale, appliedAbility))}</p>}
      {availableAbilities.length > 0 && (
        <p>{copy.featBonusPending(availableAbilities.map((ability) => abilityLabel(locale, ability)).join(locale === "zh" ? "、" : ", "))}</p>
      )}
      <a
        href={featRulesUrl[edition]}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-xs text-primary underline underline-offset-2 print:text-inherit"
      >
        {copy.featRuleReference(edition)}
      </a>
    </div>
  );
};
