<template>
    <div ref="mapContainer" class="w-full h-full rounded-2xl overflow-hidden !mt-4"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const props = defineProps({
    dark: {
        required: true,
        type: Boolean
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    truckPoint: {
        type: Array,
        required: true
    }
});

const mapContainer = ref(null);
let map = null;
let startMarker = null;
let endMarker = null;
let truckMarker = null;

const geocodePlace = async (placeName) => {
    const token = import.meta.env.VITE_MAPBOX_TOKEN;
    const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(placeName)}&access_token=${token}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Geocoding API error: ${res.status}`);

    const data = await res.json();
    const feature = data.features?.[0];

    if (!feature?.geometry?.coordinates) {
        throw new Error(`${placeName} uchun koordinata topilmadi`);
    }

    return feature.geometry.coordinates;
};

const getDrivingRoute = async (points) => {
    const token = import.meta.env.VITE_MAPBOX_TOKEN;
    const coords = points.map((p) => `${p[0]},${p[1]}`).join(";");

    const url =
        `https://api.mapbox.com/directions/v5/mapbox/driving/${coords}` +
        `?geometries=geojson&overview=full&access_token=${token}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Directions API error: ${res.status}`);

    const data = await res.json();
    return data.routes?.[0]?.geometry?.coordinates || [];
};

const applyLightPreset = (mode) => {
    if (!map || !map.isStyleLoaded()) return;

    map.setConfigProperty("basemap", "lightPreset", mode ? "night" : "day");

    if (map.getLayer("route-direct-line")) {
        map.setPaintProperty(
            "route-direct-line",
            "line-color",
            mode ? "#facc15" : "#3b82f6"
        );
    }
};

const drawRoutes = async () => {
    if (!map || !map.isStyleLoaded()) return;

    try {
        const startCoords = await geocodePlace(props.from);
        const endCoords = await geocodePlace(props.to);

        const directRoute = await getDrivingRoute([
            startCoords,
            endCoords,
        ]);

        const truckPoint = props.truckPoint;

        const truckRoute = await getDrivingRoute([
            startCoords,
            truckPoint,
            endCoords,
        ]);

        const directGeoJson = {
            type: "Feature",
            properties: {},
            geometry: {
                type: "LineString",
                coordinates: directRoute,
            },
        };

        const truckGeoJson = {
            type: "Feature",
            properties: {},
            geometry: {
                type: "LineString",
                coordinates: truckRoute,
            },
        };

        if (map.getSource("route-truck")) {
            map.getSource("route-truck").setData(truckGeoJson);
        } else {
            map.addSource("route-truck", {
                type: "geojson",
                data: truckGeoJson,
            });

            map.addLayer({
                id: "route-truck-line",
                type: "line",
                source: "route-truck",
                layout: {
                    "line-cap": "round",
                    "line-join": "round",
                },
                paint: {
                    "line-color": "#ef4444",
                    "line-width": 6,
                    "line-opacity": 0.8,
                },
            });
        }

        if (map.getSource("route-direct")) {
            map.getSource("route-direct").setData(directGeoJson);
        } else {
            map.addSource("route-direct", {
                type: "geojson",
                data: directGeoJson,
            });

            map.addLayer({
                id: "route-direct-line",
                type: "line",
                source: "route-direct",
                layout: {
                    "line-cap": "round",
                    "line-join": "round",
                },
                paint: {
                    "line-color": "#3b82f6",
                    "line-width": 5,
                    "line-opacity": 0.85,
                },
            });
        }

        if (startMarker) startMarker.remove();
        if (endMarker) endMarker.remove();
        if (truckMarker) truckMarker.remove();

        startMarker = new mapboxgl.Marker({color: "#3b82f6"})
            .setLngLat(startCoords)
            .setPopup(
                new mapboxgl.Popup().setHTML(`<b>Boshlanish</b><br>${props.from}`)
            )
            .addTo(map);

        endMarker = new mapboxgl.Marker({color: "#3b82f6"})
            .setLngLat(endCoords)
            .setPopup(
                new mapboxgl.Popup().setHTML(`<b>Yakun</b><br>${props.to}`)
            )
            .addTo(map);

        const el = document.createElement("div");
        el.className = "truck-marker";

        truckMarker = new mapboxgl.Marker(el)
            .setLngLat(truckPoint)
            .setPopup(
                new mapboxgl.Popup().setHTML("<b>Kuzatilayotgan obyekt</b>")
            )
            .addTo(map);

        const bounds = new mapboxgl.LngLatBounds();
        truckRoute.forEach((coord) => bounds.extend(coord));

        map.fitBounds(bounds, {
            padding: 80,
            duration: 1500,
        });
    } catch (error) {
        console.error("Xato:", error);
    }
};

watch(
    () => props.dark,
    (newMode) => {
        applyLightPreset(newMode);
    }
);

watch(
    () => [props.from, props.to],
    async ([newFrom, newTo], [oldFrom, oldTo]) => {
        if (!map) return;
        if (!map.isStyleLoaded()) return;
        if (newFrom === oldFrom && newTo === oldTo) return;

        await drawRoutes();
    }
);

onMounted(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    map = new mapboxgl.Map({
        container: mapContainer.value,
        style: "mapbox://styles/mapbox/standard",
        config: {
            basemap: {
                lightPreset: props.dark ? "night" : "day",
            },
        },
        center: [69.2401, 41.2995],
        zoom: 6,
        pitch: 60,
        bearing: -30,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("load", async () => {
        await drawRoutes();
    });
});

onUnmounted(() => {
    if (startMarker) startMarker.remove();
    if (endMarker) endMarker.remove();
    if (truckMarker) truckMarker.remove();

    if (map) {
        map.remove();
        map = null;
    }
});
</script>

<style scoped>
</style>