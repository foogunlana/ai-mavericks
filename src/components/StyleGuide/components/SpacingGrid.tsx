const SPACING_SCALE = [
  { name: '1', px: '4px' },
  { name: '2', px: '8px' },
  { name: '3', px: '12px' },
  { name: '4', px: '16px' },
  { name: '5', px: '20px' },
  { name: '6', px: '24px' },
  { name: '7', px: '32px' },
  { name: '8', px: '40px' },
  { name: '9', px: '48px' },
  { name: '10', px: '56px' },
  { name: '11', px: '64px' },
  { name: '12', px: '80px' },
  { name: '13', px: '96px' },
  { name: '14', px: '120px' },
  { name: '15', px: '160px' },
];

export function SpacingGrid() {
  return (
    <div className="space-y-6">
      {SPACING_SCALE.map(({ name, px }) => (
        <div key={name} className="flex items-center gap-4">
          <div
            className="bg-blue-500 rounded"
            style={{ width: px, height: '40px' }}
          />
          <div className="font-mono text-sm">
            <div className="font-semibold text-gray-900">Space {name}</div>
            <div className="text-gray-500">{px}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
