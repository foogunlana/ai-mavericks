interface ColorSwatchProps {
  name: string;
  value: string;
  hex: string;
}

export function ColorSwatch({ name, value, hex }: ColorSwatchProps) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="w-32 h-32 rounded border border-gray-200"
        style={{ backgroundColor: value }}
        title={value}
      />
      <div className="text-sm">
        <div className="font-semibold text-gray-900">{name}</div>
        <div className="text-gray-500 font-mono text-xs">{hex}</div>
      </div>
    </div>
  );
}
