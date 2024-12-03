interface MiniMapProps {
  currentRoom: string
}

export default function MiniMap({ currentRoom }: MiniMapProps) {
  return (
    <div className="absolute top-4 right-4 bg-[#A9A9A9] p-2 rounded">
      <h3 className="text-[#2C2C2C] font-bold mb-2">Mini Map</h3>
      <div className="flex space-x-2">
        {['Living Room', 'Kitchen', 'Bedroom'].map((room) => (
          <div
            key={room}
            className={`w-4 h-4 rounded-full ${
              room === currentRoom ? 'bg-[#D3D3D3]' : 'bg-[#2C2C2C]'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

