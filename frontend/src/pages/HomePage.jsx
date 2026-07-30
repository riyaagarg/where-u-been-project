import { useState, useRef, useEffect } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import PinPopup from "../components/PinPopup";
import usePinStore from "../store/usePinStore";
import useAuthStore from "../store/useAuthStore"
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const MAPBOX_STYLE = "mapbox://styles/riyaaagarg/cms4dk4p200ty01qk3ecgdkj4";

mapboxgl.accessToken = MAPBOX_TOKEN;

function HomePage() {
  const [query, setQuery] = useState("");
  const [activePin, setActivePin] = useState(null);
  const [searchError, setSearchError] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);
  // const user = useAuthStore((state) => state.user);
  const auth = useAuthStore();
  console.log("AUTH STORE:", auth);

  const user = auth.user;
  const fetchPins = usePinStore((state) => state.fetchPins);
  const pins = usePinStore((state) => state.pins);
  const addPin = usePinStore((state) => state.addPin);

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]); // { pinId, marker, type: 'temp' | 'persistent' }
  const mapLoadedRef = useRef(false);

  //ai
  const [funFact, setFunFact] = useState("");
  const [loadingFact, setLoadingFact] = useState(false);
  const [factError, setFactError] = useState("");

  //globe render
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: MAPBOX_STYLE,
      projection: "globe",
      zoom: 1.5,
      center: [0, 5],
      padding: {
        top: 170,
        left: 0,
        right: 0,
        bottom: 0,
      },
    });

    map.on("style.load", () => {
      map.setFog({});

      const style = map.getStyle();
      style.layers.forEach((layer) => {
        const id = layer.id.toLowerCase();
        const isMinorPlaceLabel = id.includes("settlement") && !id.includes("major");
        const isPoi = id.includes("poi");

        if (isMinorPlaceLabel || isPoi) {
          map.setLayoutProperty(layer.id, "visibility", "none");
        }
      });

      mapLoadedRef.current = true;
      setMapLoaded(true);

    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapLoadedRef.current = false;
      markersRef.current = [];
    };
  }, []);

  const dropMarker = (pin) => {
    const map = mapRef.current;
    if (!map || !mapLoadedRef.current) return;

    // clear only the temporary "just searched" marker(s) — leave persistent ones alone
    markersRef.current = markersRef.current.filter((m) => {
      if (m.type === "temp") {
        m.marker.remove();
        return false;
      }
      return true;
    });

    //new search appear
    const marker = new mapboxgl.Marker({ color: "#960303" })
      .setLngLat([pin.lng, pin.lat])
      .addTo(map);


    marker.getElement().style.cursor = "pointer";
    marker.getElement().addEventListener("click", () => setActivePin(pin));

    markersRef.current.push({ pinId: pin._id, marker, type: "temp" });
  };


  // console.log("yes rendering")

  // console.log("Current user:", user);

  // useEffect(() => {
  //   console.log("useeffect User:", user);
  //   if (user?.userId) {
  //     console.log("Fetching pins for:", user.userId);
  //     fetchPins(user.userId);   
  //   }
  // }, [user]);

  //pins render
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoadedRef.current) return;

    // clear old persistent markers before replotting — avoids duplicate stacking, leaves temp marker alone
    markersRef.current = markersRef.current.filter((m) => {
      if (m.type === "persistent") {
        m.marker.remove();
        return false;
      }
      return true;
    });

    const pinsWithPhotos = pins.filter((p) => p.photos && p.photos.length > 0);

    pinsWithPhotos.forEach((pin) => {
      const marker = new mapboxgl.Marker({ color: "red" })
        .setLngLat([pin.lng, pin.lat])
        .addTo(map);

      marker.getElement().style.cursor = "pointer";
      marker.getElement().addEventListener("click", () => setActivePin(pin));

      markersRef.current.push({ pinId: pin._id, marker, type: "persistent" });
    });
  }, [pins, mapLoaded]);



  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    const place = query.trim();
    setSearchError("");

    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          place
        )}.json?access_token=${MAPBOX_TOKEN}&limit=1&types=country,region,place`
      );

      const data = await res.json();
      const feature = data.features?.[0];

      if (!feature || feature.relevance < 0.6) {
        setSearchError("Place not found. Try another search.");
        return;
      }

      const [lng, lat] = feature.center;
      const map = mapRef.current;

      map.flyTo({
        center: [lng, lat],
        zoom: 5,
        duration: 2500,
        essential: true,
      });

      // reuse the existing DB pin if this place was already searched before 
      const existingPin = pins.find(
        (p) => p.name.toLowerCase() === place.toLowerCase()
      );

      let targetPin = existingPin;
      if (!targetPin) {
        targetPin = await addPin(place, lng, lat, user.userId);
        if (!targetPin) {
          setSearchError("Failed to save pin. Try again.");
          return;
        }
      }
      // const newPin = addPin(place, lng, lat, user.userId);

      dropMarker(targetPin);

      map.once("moveend", () => {
        setActivePin(targetPin);
      });

      setQuery("");
    } catch (err) {
      console.error(err);
      setSearchError("Something went wrong while searching.");
    }
  };

  useEffect(() => {
    console.log("useeffect User:", user);
    if (user?.userId) {
      console.log("Fetching pins for:", user.userId);
      fetchPins();
    }
  }, [user]);


  //ai useeffect
  useEffect(() => {
    if (!activePin) {
      setFunFact("");
      setFactError("");
      return;
    }

    const fetchFact = async () => {
      setLoadingFact(true);
      setFunFact("");
      setFactError("");
      try {
        const res = await fetch("http://localhost:5000/api/ai/fun-fact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ name: activePin.name }),
        });
        const data = await res.json();
        if (res.ok) {
          setFunFact(data.fact);
        } else {
          setFactError(data.message || "Something went wrong");
        }
      } catch (err) {
        setFactError("Network error");
      } finally {
        setLoadingFact(false);
      }
    };

    fetchFact();
  }, [activePin]);


  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background Globe */}
      <div ref={mapContainerRef} className="fixed top-0 left-0 w-screen h-screen z-0" />

      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-50 px-6"><DashboardNavbar /> </div>

      {/* Search Section */}
      <div className="absolute top-24 left-0 z-50 px-6">
        <form onSubmit={handleSearch} className="flex gap-2 max-w-lg">
          <input type="text" placeholder="Search a place" value={query} onChange={(e) => setQuery(e.target.value)} className="input input-bordered flex-1" />

          <button type="submit" className="btn bg-[#3d3939] hover:bg-[#282929] text-white border-none"> Search </button>
        </form>

        {searchError && (
          <p className="text-error text-sm mt-2">
            {searchError}
          </p>
        )}
      </div>

      {activePin && (<PinPopup pin={activePin} onClose={() => setActivePin(null)} />)}
      {activePin && (funFact || loadingFact || factError) && (
        <div className="absolute bottom-8 right-8 z-40 bg-black/85 text-white text-base leading-relaxed px-6 py-4 rounded-2xl max-w-md w-[90%] shadow-xl max-h-120 overflow-y-auto">
          <h3 className="font-semibold text-lg mb-2">{activePin.name}</h3>
          {loadingFact ? "Loading..." : factError || funFact}
        </div>
      )}

    </div>
  );
}

export default HomePage;