import json
import math

states = {
    "Abia": [5.5320, 7.4860],
    "Adamawa": [9.3333, 12.5000],
    "Akwa Ibom": [5.0060, 7.9266],
    "Anambra": [6.2104, 7.0699],
    "Bauchi": [10.3158, 9.8442],
    "Bayelsa": [4.7719, 6.0699],
    "Benue": [7.3369, 8.7404],
    "Borno": [11.8333, 13.1500],
    "Cross River": [5.9631, 8.3307],
    "Delta": [5.7040, 5.9339],
    "Ebonyi": [6.2649, 8.0137],
    "Edo": [6.5438, 5.8987],
    "Ekiti": [7.7190, 5.3110],
    "Enugu": [6.4402, 7.4943],
    "Gombe": [10.2897, 11.1673],
    "Imo": [5.4853, 7.0358],
    "Jigawa": [12.2280, 9.5616],
    "Kaduna": [10.5105, 7.4165],
    "Kano": [11.9964, 8.5167],
    "Katsina": [12.9816, 7.6223],
    "Kebbi": [11.4942, 4.0623],
    "Kogi": [7.7337, 6.6906],
    "Kwara": [8.9669, 4.3874],
    "Lagos": [6.5244, 3.3792],
    "Nasarawa": [8.5375, 8.3075],
    "Niger": [9.9322, 5.5975],
    "Ogun": [7.1475, 3.3619],
    "Ondo": [7.2508, 5.2058],
    "Osun": [7.5629, 4.5200],
    "Oyo": [8.1574, 3.6147],
    "Plateau": [9.2182, 9.5179],
    "Rivers": [4.8156, 7.0498],
    "Sokoto": [13.0609, 5.2390],
    "Taraba": [8.8937, 11.3596],
    "Yobe": [12.2939, 11.4404],
    "Zamfara": [12.1628, 6.6614],
    "Abuja": [9.0765, 7.3986]
}

reached_states = ["Kano", "Bauchi", "Oyo", "Lagos", "Abuja"]

def distance(lat1, lon1, lat2, lon2):
    return math.sqrt((lat1 - lat2)**2 + (lon1 - lon2)**2)

markers = []
arcs = []

# Generate markers
for state, coords in states.items():
    is_reached = state in reached_states
    desc = ""
    if state == "Kano": desc = "MSME Develepment Initiative"
    elif state == "Bauchi": desc = "NATCO"
    elif state == "Oyo": desc = "NATCO, Insurance"
    elif state == "Lagos": desc = "NATCO"
    elif state == "Abuja": desc = "SafeHire"
    else: desc = "Coming Soon"
    
    markers.append({
        "id": state.lower().replace(" ", "_"),
        "name": state,
        "description": desc,
        "location": coords,
        "size": 0.05,
        "is_reached": is_reached
    })

# Compute nearest neighbor for each state
for marker in markers:
    min_dist = float('inf')
    nearest = None
    for other in markers:
        if marker['id'] == other['id']: continue
        d = distance(marker['location'][0], marker['location'][1], other['location'][0], other['location'][1])
        if d < min_dist:
            min_dist = d
            nearest = other
    
    # If either state is unreached, use red arc. Else blue.
    # Color config: blue = [0.35, 0.55, 1.0], red = [1.0, 0.2, 0.2]
    # Let's output it as a string that we can paste.
    color_str = "[1.0, 0.2, 0.2]" if not (marker['is_reached'] and nearest['is_reached']) else "[0.35, 0.55, 1.0]"
    arcs.append(f"  {{ from: [{marker['location'][0]}, {marker['location'][1]}], to: [{nearest['location'][0]}, {nearest['location'][1]}], color: {color_str} }}")

print("export const MARKERS: GlobeMarker[] = [")
for m in markers:
    print(f"  {{ id: '{m['id']}', name: '{m['name']}', description: '{m['description']}', location: [{m['location'][0]}, {m['location'][1]}], size: {m['size']} }},")
print("];")

print("\nexport const ARCS: Arc[] = [")
for a in arcs:
    print(a + ",")
print("];")
