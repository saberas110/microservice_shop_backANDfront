import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationMarker({ setAddress, position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&format=json`
      )
        .then((res) => res.json())
        .then((data) => {
          setAddress(data.display_name);
        });
    },
  });

  return position ? <Marker position={position} icon={markerIcon} /> : null;
}

export default function LocationPicker() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState("");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);

  // گرفتن لوکیشن فعلی کاربر
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  }, []);

  // هندل سرچ با autocomplete
  useEffect(() => {
    if (search.length > 2) {
      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          search
        )}`
      )
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
        });
    } else {
      setResults([]);
    }
  }, [search]);

  const handleSelect = (item: any) => {
    const { lat, lon, display_name } = item;
    setPosition([parseFloat(lat), parseFloat(lon)]);
    setAddress(display_name);
    setSearch(display_name);
    setResults([]); // بستن لیست بعد از انتخاب
  };

  return (
    <div className="relative">
      {/* input جستجو */}
      <input
        type="text"
        placeholder="جستجوی آدرس..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-full"
      />

      {/* لیست پیشنهادها */}
      {results.length > 0 && (
        <ul className="absolute bg-white border w-full max-h-60 overflow-y-auto z-10">
          {results.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSelect(item)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {item.display_name}
            </li>
          ))}
        </ul>
      )}

      {/* نقشه */}
      <MapContainer
        center={position || [35.6892, 51.3890]} // پیش‌فرض تهران
        zoom={13}
        style={{ height: "400px", width: "100%", marginTop: "10px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker
          setAddress={setAddress}
          position={position}
          setPosition={setPosition}
        />
      </MapContainer>

      {address && (
        <p className="mt-2 text-right">
          <strong>آدرس انتخاب‌شده:</strong> {address}
        </p>
      )}
    </div>
  );
}
