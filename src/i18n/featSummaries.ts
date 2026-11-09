import type { FeatName } from "@/data/feats";
import type { originFeats2024 } from "@/data/origins2024";
import type { RulesEdition } from "@/utils/origin2024";
import type { Locale } from "./locale";

type Summary = Record<Locale, string>;

const tough = {
  en: "Your maximum HP increases by 2 per character level.",
  zh: "每个角色等级使你的生命值上限增加 2。",
};

// Short, original descriptions of the Player’s Handbook feats and published errata.
// Ability increases are displayed separately using the calculator’s existing rules.
const legacySummaries = {
  Actor: {
    en: "Imitate voices and sounds. When passing as someone else, you have advantage on Deception and Performance checks.",
    zh: "你可以模仿声音。冒充他人时，你的欺瞒和表演检定具有优势。",
  },
  Alert: {
    en: "Gain +5 to initiative. While conscious you can’t be surprised, and attackers gain no advantage solely because you can’t see them.",
    zh: "先攻获得 +5。你有意识时不会措手不及，攻击者也不会仅因你看不见它而获得优势。",
  },
  Athlete: {
    en: "Stand up using 5 feet of movement, climb at normal speed, and make running jumps with a 5-foot run-up.",
    zh: "起身只需消耗 5 尺移动力，攀爬不额外消耗移动力，助跑跳跃只需助跑 5 尺。",
  },
  Charger: {
    en: "After taking the Dash action, make a melee weapon attack or shove as a bonus action. A straight run of at least 10 feet boosts the damage or push distance.",
    zh: "执行疾走动作后，可用附赠动作进行一次近战武器攻击或推撞。直线冲刺至少 10 尺可增加伤害或推离距离。",
  },
  "Crossbow Expert": {
    en: "Ignore loading on crossbows you’re proficient with and shoot without disadvantage from nearby enemies. A one-handed weapon attack can set up a bonus-action hand crossbow shot.",
    zh: "无视你所熟练的弩的装填属性。敌人贴近时，远程攻击不因此具有劣势。用单手武器攻击可让你用附赠动作发射手弩。",
  },
  "Defensive Duelist": {
    en: "While wielding a finesse weapon you’re proficient with, react to a melee hit by adding your proficiency bonus to AC against that attack.",
    zh: "持用你所熟练的灵巧武器时，若被近战攻击命中，可用反应将熟练加值加入对抗该次攻击的护甲等级。",
  },
  "Dual Wielder": {
    en: "Gain +1 AC while holding a melee weapon in each hand. You can fight with non-light one-handed melee weapons and draw or stow both together.",
    zh: "双手各持一把近战武器时，护甲等级获得 +1。你可以双持非轻型的单手近战武器，并同时拔出或收起两把。",
  },
  "Dungeon Delver": {
    en: "Spot secret doors and resist traps more easily, take reduced trap damage, and keep your usual passive Perception while traveling at a fast pace.",
    zh: "寻找暗门和抵抗陷阱时更有利，受到的陷阱伤害减半，快速行进也不会降低被动察觉。",
  },
  Durable: {
    en: "When you roll a Hit Die to heal, you recover at least twice your Constitution modifier, with a minimum of 2 HP.",
    zh: "掷生命骰恢复生命值时，至少恢复等于体质调整值两倍的生命值，最低为 2 点。",
  },
  "Elemental Adept": {
    en: "Pick an elemental damage type. Your spells bypass resistance to that type, and you can count 1s on those damage dice as 2s.",
    zh: "选择一种元素伤害类型。你的法术无视对该类型的抗性，且该类型伤害骰掷出 1 时可视为 2。",
  },
  Grappler: {
    en: "Gain advantage on attacks against a creature you’re grappling. You can attempt to pin it, restraining both of you if you succeed.",
    zh: "攻击被你擒抱的生物时具有优势。你可以尝试压制它，成功时双方都陷入束缚状态。",
  },
  "Great Weapon Master": {
    en: "A melee critical hit or finishing blow can earn a bonus-action attack. With a heavy weapon you’re proficient with, you can trade −5 to hit for +10 damage.",
    zh: "近战重击或击倒敌人后，可用附赠动作再攻击一次。使用你所熟练的重型武器时，可用攻击检定 −5 换取伤害 +10。",
  },
  Healer: {
    en: "Use a healer’s kit to stabilize someone at 1 HP or to restore hit points. Each creature can receive the feat’s larger heal once between rests.",
    zh: "使用医疗包使濒死生物稳定并恢复至 1 点生命值，或为生物恢复更多生命值。每个生物在两次休息之间只能接受一次后者。",
  },
  "Heavily Armored": { en: "Gain proficiency with heavy armor.", zh: "获得重甲熟练。" },
  "Heavy Armor Master": {
    en: "While wearing heavy armor, reduce bludgeoning, piercing, and slashing damage from nonmagical attacks by 3.",
    zh: "穿戴重甲时，非魔法攻击造成的钝击、穿刺和挥砍伤害减少 3 点。",
  },
  "Inspiring Leader": {
    en: "Give a 10-minute speech to grant up to six friendly creatures temporary HP equal to your level plus your Charisma modifier.",
    zh: "花 10 分钟鼓舞最多六个友方生物，使其获得等于你等级加魅力调整值的临时生命值。",
  },
  "Keen Mind": {
    en: "Always know north and the time until sunrise or sunset. Recall what you’ve seen or heard over the past month.",
    zh: "你始终知道北方以及距日出或日落的时间，并能准确回忆过去一个月的所见所闻。",
  },
  "Lightly Armored": { en: "Gain proficiency with light armor.", zh: "获得轻甲熟练。" },
  Linguist: { en: "Learn three languages and create your own written ciphers.", zh: "学会三种语言，并能编写自己的密码。" },
  Lucky: {
    en: "Spend one of three luck points to roll an extra d20 for your attack, check, or save, or for an attack against you. You choose which roll to use.",
    zh: "你有 3 点幸运点。消耗 1 点可为自己的攻击检定、属性检定、豁免或针对你的攻击多掷一个 d20，由你选择采用哪个结果。",
  },
  "Mage Slayer": {
    en: "React to nearby spellcasting with a melee attack, disrupt concentration when you deal damage, and gain advantage on saves against spells cast within 5 feet.",
    zh: "附近有生物施法时可用反应进行近战攻击。你造成伤害时更容易打断专注，对 5 尺内生物所施法术的豁免具有优势。",
  },
  "Magic Initiate": {
    en: "Learn two cantrips and one 1st-level spell from a class’s spell list. You can cast the 1st-level spell once per long rest using the feat.",
    zh: "从同一职业的法术列表中学习两个戏法和一个一环法术。每次长休后可通过此专长施展该一环法术一次。",
  },
  "Martial Adept": {
    en: "Learn two Battle Master maneuvers and gain one d6 superiority die that returns after a short or long rest.",
    zh: "学习两种战斗大师战技，并获得一个 d6 卓越骰，短休或长休后恢复。",
  },
  "Medium Armor Master": {
    en: "Medium armor no longer penalizes Stealth and can count up to +3 from your Dexterity modifier toward AC.",
    zh: "中甲不再使隐匿检定具有劣势，计算护甲等级时可计入最高 +3 的敏捷调整值。",
  },
  Mobile: {
    en: "Gain 10 feet of speed. Difficult terrain costs no extra movement when you Dash, and creatures you attack in melee can’t make opportunity attacks against you that turn.",
    zh: "速度增加 10 尺。疾走时困难地形不额外消耗移动力。本回合被你近战攻击过的生物不能对你发动借机攻击。",
  },
  "Moderately Armored": { en: "Gain proficiency with medium armor and shields.", zh: "获得中甲和盾牌熟练。" },
  "Mounted Combatant": {
    en: "While mounted, gain advantage in melee against smaller unmounted targets, redirect attacks from your mount to yourself, and protect it from some area effects.",
    zh: "骑乘时，近战攻击比坐骑小且未骑乘的目标具有优势。你可以替坐骑承受攻击，并帮助它躲避部分范围效果。",
  },
  Observant: {
    en: "Read lips in languages you understand and gain +5 to passive Perception and Investigation.",
    zh: "你能读懂所通晓语言的唇语，被动察觉和被动调查均获得 +5。",
  },
  "Polearm Master": {
    en: "Eligible polearms let you follow up with a bonus-action strike and make opportunity attacks when enemies enter your reach.",
    zh: "使用符合条件的长柄武器时，可用附赠动作追加攻击，并在敌人进入你的触及范围时发动借机攻击。",
  },
  Resilient: { en: "Gain saving throw proficiency in the ability you increase.", zh: "获得所提高属性对应的豁免熟练。" },
  "Ritual Caster": {
    en: "Start a ritual book with two 1st-level rituals from a chosen class, then add eligible written rituals you find.",
    zh: "从一个职业的法术列表中选择两个一环仪式法术记入仪式书，之后可抄录找到的符合条件的仪式。",
  },
  "Savage Attacker": {
    en: "Once per turn, reroll the damage dice for a melee weapon attack and use either total.",
    zh: "每回合一次，你可重掷一次近战武器攻击的伤害骰，并选择采用哪一组总值。",
  },
  Sentinel: {
    en: "Your opportunity hits stop movement, even if the target Disengaged. You can also retaliate when a nearby enemy attacks someone else.",
    zh: "借机攻击命中会使目标停止移动，撤离也无法避免你的借机攻击。附近敌人攻击他人时，你也可以反击。",
  },
  Sharpshooter: {
    en: "Your ranged weapon attacks ignore partial cover and long-range disadvantage. With a ranged weapon you’re proficient with, you can trade −5 to hit for +10 damage.",
    zh: "远程武器攻击无视半身掩护、四分之三掩护和远距离劣势。使用熟练的远程武器时，可用攻击检定 −5 换取伤害 +10。",
  },
  "Shield Master": {
    en: "Shove as a bonus action when you attack, and use your shield to improve certain Dexterity saves or avoid damage on a successful save.",
    zh: "执行攻击动作时可以用附赠动作推撞。盾牌可强化特定敏捷豁免，也可让你在某些豁免成功时免受伤害。",
  },
  Skilled: { en: "Gain three proficiencies in any mix of skills and tools.", zh: "从技能和工具中任选三项获得熟练。" },
  Skulker: {
    en: "Hide in light obscurement, stay hidden when a ranged weapon attack misses, and avoid dim light’s penalty to sight-based Perception.",
    zh: "你可以在轻度遮蔽中躲藏，远程武器攻击未命中时不会暴露位置，微光也不会使依赖视觉的察觉检定具有劣势。",
  },
  "Spell Sniper": {
    en: "Double the range of spells that use attack rolls, ignore partial cover with ranged spell attacks, and learn an attack cantrip.",
    zh: "需要攻击检定的法术射程翻倍，远程法术攻击无视半身和四分之三掩护，并学会一个需要攻击检定的戏法。",
  },
  "Tavern Brawler": {
    en: "Gain improvised weapon proficiency and d4 unarmed damage. A hit with either can set up a bonus-action grapple.",
    zh: "获得临时武器熟练，徒手打击的伤害骰为 d4。用两者之一命中后，可以用附赠动作尝试擒抱。",
  },
  Tough: tough,
  "War Caster": {
    en: "Gain advantage on concentration saves caused by damage, perform somatic components with full hands, and cast an eligible spell in place of an opportunity attack.",
    zh: "因受伤而维持专注的豁免具有优势，双手持物也能完成姿势成分，并可用符合条件的法术代替借机攻击。",
  },
  "Weapon Master": { en: "Gain proficiency with four simple or martial weapons of your choice.", zh: "从简易武器和军用武器中任选四种获得熟练。" },
} satisfies Record<FeatName, Summary>;

const magicInitiate2024 = {
  en: "Learn two cantrips and prepare one 1st-level spell from this spell list. Cast the prepared spell once per long rest without a slot, or use spell slots to cast it again.",
  zh: "从该法术列表学习两个戏法并准备一个一环法术。每次长休后可不消耗法术位施展该法术一次，也可消耗法术位再次施展。",
};

const originSummaries = {
  Alert: {
    en: "Add your proficiency bonus to initiative. After rolling, you can swap your initiative with a willing ally in the same combat.",
    zh: "先攻检定加上熟练加值。掷骰后，你可以与同一场战斗中自愿的盟友交换先攻结果。",
  },
  Crafter: {
    en: "Gain three artisan’s tool proficiencies, pay 20% less for nonmagical items, and use Fast Crafting to make temporary gear.",
    zh: "获得三种工匠工具的熟练，购买非魔法物品可享八折，并能用快速制作打造临时装备。",
  },
  Healer: {
    en: "Use a healer’s kit to let a creature spend a Hit Die to heal, adding your proficiency bonus. Reroll 1s on healing dice from this feat or your spells.",
    zh: "使用医疗包让生物消耗一个生命骰恢复生命值，并加上你的熟练加值。此专长或你的法术用于治疗时，治疗骰掷出 1 可重掷。",
  },
  Lucky: {
    en: "After a long rest, you have luck points equal to your proficiency bonus. Spend one for advantage on your d20 test or disadvantage on an attack against you.",
    zh: "长休后，你拥有等于熟练加值的幸运点。消耗 1 点可使自己的 d20 检定获得优势，或使针对你的攻击检定具有劣势。",
  },
  "Magic Initiate (Cleric)": magicInitiate2024,
  "Magic Initiate (Druid)": magicInitiate2024,
  "Magic Initiate (Wizard)": magicInitiate2024,
  Musician: {
    en: "Gain three instrument proficiencies. Play after a short or long rest to give Heroic Inspiration to allies up to your proficiency bonus.",
    zh: "获得三种乐器的熟练。短休或长休结束时演奏，可给予最多等于你熟练加值数量的盟友英雄激励。",
  },
  "Savage Attacker": {
    en: "Once per turn after a weapon hit, roll the weapon’s damage dice twice and choose which roll to use.",
    zh: "每回合一次，武器攻击命中后，可以掷两次武器伤害骰并选择采用哪一组结果。",
  },
  Skilled: {
    en: "Gain three proficiencies in any mix of skills and tools. You can take this feat more than once.",
    zh: "从技能和工具中任选三项获得熟练。此专长可以重复选择。",
  },
  "Tavern Brawler": {
    en: "Gain improvised weapon proficiency, deal d4-based unarmed damage, and reroll unarmed damage dice that show 1. Once per turn, an unarmed hit as part of the Attack action can also push the target 5 feet.",
    zh: "获得临时武器熟练，徒手打击的伤害骰为 d4，掷出 1 时可重掷。每回合一次，以攻击动作进行徒手打击并命中后，还可将目标推离 5 尺。",
  },
  Tough: tough,
} satisfies Record<(typeof originFeats2024)[number], Summary>;

export const featRulesUrl: Record<RulesEdition, string> = {
  "2014": "https://www.dndbeyond.com/sources/dnd/phb-2014/customization-options#Feats",
  "2024": "https://www.dndbeyond.com/posts/1785-the-backgrounds-and-origin-feats-in-the-2024#OriginFeatDescriptions",
};

export const getFeatSummary = (edition: RulesEdition, feat: string, locale: Locale): string | undefined => {
  const summaries: Readonly<Record<string, Summary>> = edition === "2014" ? legacySummaries : originSummaries;
  return Object.hasOwn(summaries, feat) ? summaries[feat][locale] : undefined;
};
