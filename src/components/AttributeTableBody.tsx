import { AttributeState } from "@/types/race";
import { calculateModifier, calculatePointCost } from "@/utils";

interface AttributeTableBodyProps {
  attributes: AttributeState;
  racialBonuses: AttributeState;
  attributeKeys: (keyof AttributeState)[];
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    attr: keyof AttributeState
  ) => void;
}

export const AttributeTableBody: React.FC<AttributeTableBodyProps> = ({
  attributes,
  racialBonuses,
  attributeKeys,
  handleChange,
}) => {
  return (
    <tbody>
      {attributeKeys.map((attrKey) => {
        const attrValue = attributes[attrKey];
        const racialBonus = racialBonuses[attrKey];
        const total = attrValue + racialBonus;

        return (
          <tr key={attrKey}>
            <td>{attrKey.charAt(0).toUpperCase() + attrKey.slice(1)}</td>
            <td className="text-center">
              <input
                type="number"
                className="border p-1 rounded text-center w-24"
                value={attrValue}
                onChange={(e) => handleChange(e, attrKey)}
              />
            </td>
            <td className="text-center">{calculatePointCost(attrValue)}</td>
            <td className="text-center">{racialBonus}</td>
            <td className="text-center">{total}</td>
            <td className="text-center">{calculateModifier(total)}</td>
          </tr>
        );
      })}
      <tr>
        <td>
          <strong>Total Cost</strong>
        </td>
        <td></td>
        <td className="text-center">
          {attributeKeys.reduce(
            (acc, attrKey) => acc + calculatePointCost(attributes[attrKey]),
            0
          )}
        </td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  );
};
