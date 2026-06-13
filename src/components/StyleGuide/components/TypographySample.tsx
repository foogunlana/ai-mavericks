interface TypographySampleProps {
  name: string;
  fontSize: string;
  fontWeight: number;
  lineHeight: number;
  letterSpacing?: string;
  family: 'serif' | 'sans';
  sample: string;
}

export function TypographySample({
  name,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing = 'normal',
  family,
  sample,
}: TypographySampleProps) {
  const fontFamily = family === 'serif' ? 'EB Garamond, serif' : 'Helvetica Neue, sans-serif';

  return (
    <div className="border border-gray-200 rounded p-6 bg-white">
      <div
        style={{
          fontFamily,
          fontSize,
          fontWeight,
          lineHeight,
          letterSpacing,
          marginBottom: '12px',
          color: '#1a1a1a',
        }}
      >
        {sample}
      </div>
      <div className="text-xs text-gray-500 space-y-1 font-mono">
        <div>{name}</div>
        <div>Size: {fontSize} | Weight: {fontWeight} | Line Height: {lineHeight}</div>
      </div>
    </div>
  );
}
