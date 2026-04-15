import { useState } from "react";

// ─── BACTERIA DATABASE ────────────────────────────────────────────────────────
const LIBRARY = [
    // ══════════════════════════════════════════════════════
    // GROUP 1: GRAM POSITIVE COCCI IN CLUSTER
    // ══════════════════════════════════════════════════════
    {
        id: "s_aureus", group: "gpc_cluster", groupLabel: "GPC in Cluster", groupColor: "#c084fc",
        name: "Staphylococcus aureus", thai: "สแตป ออเรียส",
        gram: "+", morphology: "Cocci", arrangement: "Clusters (grape-like)",
        tags: ["MRSA", "nosocomial", "food poisoning", "toxin"],
        clinicalInfo: {
            naturalHabitat: "Anterior nares (~30% population), skin, throat",
            diseases: ["Skin/soft tissue: furuncle, carbuncle, impetigo, cellulitis", "Bacteremia & endocarditis", "Pneumonia (post-influenza)", "Osteomyelitis & septic arthritis", "Toxic shock syndrome (TSS)", "Scalded skin syndrome (SSSS) in neonates", "Food poisoning (heat-stable enterotoxin)"],
            transmission: "Contact with colonized/infected skin; contaminated food; healthcare settings",
            notableFactors: "MRSA (mecA gene); Panton-Valentine Leukocidin (PVL); TSST-1; Exfoliative toxins A & B",
        },
        colony: {
            BAP: "Round, raised, opaque, 1–4 mm; golden/yellow pigment; clear β-hemolysis zone",
            MSA: "Yellow colonies + yellow halo (mannitol fermentation)",
            odor: "None distinctive",
        },
        gram_stain: "Large GPC (0.5–1.5 µm), occur singly, pairs, short chains, and irregular clusters (grape-like)",
        key_biochem: [
            { test: "Catalase", result: "+", note: "Distinguishes from Streptococcus" },
            { test: "Coagulase (tube)", result: "+", note: "Key identification test for S. aureus" },
            { test: "Coagulase (slide)", result: "+", note: "Clumping factor" },
            { test: "DNase", result: "+", note: "Zone of clearance on DNase agar" },
            { test: "Mannitol (MSA)", result: "+", note: "Yellow colonies/halo" },
            { test: "Phosphatase", result: "+", note: "Pink color reaction" },
            { test: "Hemolysis", result: "β", note: "Most strains" },
            { test: "Oxidase", result: "−", note: "" },
            { test: "Novobiocin", result: "S", note: "" },
        ],
        media: ["Blood agar (BAP)", "Mannitol Salt Agar (MSA) — selective", "DNase agar"],
        condition: "35–37°C, aerobic, 18–24h",
        importance: "critical",
        notes: "Most virulent Staphylococcus. ~25–30% of healthy adults are nasal carriers. MRSA is a WHO high-priority pathogen. Coagulase = gold standard for S. aureus ID.",
    },
    {
        id: "s_epidermidis", group: "gpc_cluster", groupLabel: "GPC in Cluster", groupColor: "#c084fc",
        name: "Staphylococcus epidermidis", thai: "สแตป เอพิเดอร์มิดิส",
        gram: "+", morphology: "Cocci", arrangement: "Clusters",
        tags: ["CoNS", "biofilm", "catheter", "nosocomial"],
        clinicalInfo: {
            naturalHabitat: "Normal skin flora (ubiquitous)",
            diseases: ["Prosthetic valve endocarditis", "Catheter-associated bacteremia", "Prosthetic joint infection", "Neonatal sepsis (premature infants)"],
            transmission: "Endogenous (from patient's own skin); contamination of implanted devices",
            notableFactors: "Biofilm formation on plastic surfaces; slime (polysaccharide intercellular adhesin)",
        },
        colony: { BAP: "White/grey, small 1–2 mm, smooth, opaque, non-hemolytic (γ)", MSA: "Non-pigmented, small white colonies (no yellow halo — mannitol negative)" },
        gram_stain: "GPC in clusters, slightly smaller than S. aureus",
        key_biochem: [
            { test: "Catalase", result: "+", note: "" },
            { test: "Coagulase (tube)", result: "−", note: "Key — CoNS" },
            { test: "DNase", result: "−", note: "" },
            { test: "Novobiocin", result: "S", note: "Distinguishes from S. saprophyticus" },
            { test: "Urease", result: "+", note: "" },
            { test: "Hemolysis", result: "γ (none)", note: "" },
            { test: "Mannitol", result: "−", note: "" },
        ],
        media: ["Blood agar (BAP)", "MSA"],
        condition: "35–37°C, aerobic",
        importance: "moderate",
        notes: "Most common CoNS isolated from blood cultures. Often considered contaminant — requires ≥2 bottles positive or clinical correlation. Novobiocin S differentiates from S. saprophyticus.",
    },
    {
        id: "s_saprophyticus", group: "gpc_cluster", groupLabel: "GPC in Cluster", groupColor: "#c084fc",
        name: "Staphylococcus saprophyticus", thai: "สแตป แซโพรฟิติคัส",
        gram: "+", morphology: "Cocci", arrangement: "Clusters",
        tags: ["UTI", "young women", "CoNS", "novobiocin R"],
        clinicalInfo: {
            naturalHabitat: "Skin (perineum, lower GI tract); environment",
            diseases: ["Uncomplicated UTI in sexually active young women (2nd most common after E. coli)", "Rarely: bacteremia, endocarditis"],
            transmission: "Ascent from perineum to urethra/bladder",
            notableFactors: "Hemagglutinin; urease production aids colonization of urinary tract",
        },
        colony: { BAP: "White or cream-yellow, 2–3 mm, non-hemolytic" },
        gram_stain: "GPC in clusters",
        key_biochem: [
            { test: "Catalase", result: "+", note: "" },
            { test: "Coagulase (tube)", result: "−", note: "CoNS" },
            { test: "Novobiocin", result: "R (≥16mm no inhibition)", note: "KEY distinguishing test!" },
            { test: "Urease", result: "+", note: "" },
            { test: "Hemolysis", result: "γ", note: "" },
            { test: "Phosphatase", result: "−", note: "vs S. epidermidis = +" },
        ],
        media: ["Blood agar (BAP)", "MSA"],
        condition: "35–37°C, aerobic",
        importance: "moderate",
        notes: "Novobiocin resistance is the KEY test. Most UTI in young women aged 16–25. Urine culture shows large number of organisms (≥10⁵ CFU/mL). Treat with fluoroquinolones, co-trimoxazole.",
    },

    // ══════════════════════════════════════════════════════
    // GROUP 2: GRAM POSITIVE COCCI IN CHAIN
    // ══════════════════════════════════════════════════════
    {
        id: "s_pyogenes", group: "gpc_chain", groupLabel: "GPC in Chain", groupColor: "#34d399",
        name: "Streptococcus pyogenes", thai: "สเตรป ไพโอจีเนส",
        gram: "+", morphology: "Cocci", arrangement: "Chains / pairs",
        tags: ["Group A", "pharyngitis", "rheumatic fever", "invasive"],
        clinicalInfo: {
            naturalHabitat: "Human throat and skin",
            diseases: ["Pharyngitis (strep throat)", "Impetigo", "Cellulitis, erysipelas", "Necrotizing fasciitis", "Scarlet fever (erythrogenic toxin)", "Invasive disease: bacteremia, meningitis", "Post-streptococcal: Acute rheumatic fever (ARF), Acute glomerulonephritis (APSGN)"],
            transmission: "Respiratory droplets; direct contact",
            notableFactors: "M protein (antiphagocytic); Streptolysin O (ASO titer); Streptolysin S; Streptokinase; Hyaluronidase; Erythrogenic toxins (SPE A, B, C)",
        },
        colony: { BAP: "Small (0.5–1 mm), transparent, grey-white, surrounded by wide zone of clear β-hemolysis" },
        gram_stain: "GPC in long chains (from broth culture)",
        key_biochem: [
            { test: "Catalase", result: "−", note: "Distinguishes from Staphylococcus" },
            { test: "Hemolysis", result: "β (wide)", note: "" },
            { test: "Bacitracin", result: "S (zone ≥10mm)", note: "Presumptive GAS ID" },
            { test: "PYR (Pyrrolidonyl)", result: "+", note: "More specific than bacitracin" },
            { test: "CAMP test", result: "−", note: "vs S. agalactiae = +" },
            { test: "Bile esculin", result: "−", note: "" },
            { test: "6.5% NaCl", result: "−", note: "" },
            { test: "Lancefield", result: "Group A", note: "Latex agglutination" },
        ],
        media: ["Blood agar (BAP)", "CNA agar (selective)", "Candle jar/CO₂"],
        condition: "35–37°C, 5% CO₂ enhances, 18–24h",
        importance: "critical",
        notes: "Bacitracin S is PRESUMPTIVE (3-5% GAS are R). PYR test is more specific. ASO titer useful for ARF diagnosis. Treat with penicillin — no resistance to date.",
    },
    {
        id: "s_agalactiae", group: "gpc_chain", groupLabel: "GPC in Chain", groupColor: "#34d399",
        name: "Streptococcus agalactiae", thai: "สเตรป อะกาแล็กเชีย",
        gram: "+", morphology: "Cocci", arrangement: "Chains",
        tags: ["Group B", "GBS", "neonatal meningitis", "CAMP positive"],
        clinicalInfo: {
            naturalHabitat: "GI tract, vagina, rectum (~25% women colonized)",
            diseases: ["Neonatal sepsis (early onset <7d, late onset 7d-3mo)", "Neonatal meningitis", "Puerperal fever", "Adult: bacteremia, pneumonia, UTI, skin/soft tissue in elderly/diabetic"],
            transmission: "Vertical transmission from mother to neonate during delivery",
            notableFactors: "Polysaccharide capsule (antiphagocytic); CAMP factor (β-lysin enhancer); Hippuricase",
        },
        colony: { BAP: "Medium grey-white, narrow zone of β-hemolysis (smaller than GAS)" },
        gram_stain: "GPC in chains",
        key_biochem: [
            { test: "Catalase", result: "−", note: "" },
            { test: "Hemolysis", result: "β (narrow zone)", note: "" },
            { test: "CAMP test", result: "+", note: "Arrowhead hemolysis with S. aureus β-lysin — KEY test!" },
            { test: "Hippurate hydrolysis", result: "+", note: "Distinguishes from other β-Strep" },
            { test: "Bacitracin", result: "R", note: "Unlike GAS" },
            { test: "PYR", result: "−", note: "" },
            { test: "Lancefield", result: "Group B", note: "" },
        ],
        media: ["Blood agar (BAP)", "Todd-Hewitt broth + gentamicin (GBS screening)"],
        condition: "35–37°C, 5% CO₂, 18–24h",
        importance: "critical",
        notes: "Screen all pregnant women at 35–37 weeks. Intrapartum antibiotic prophylaxis (IAP) with penicillin. CAMP test is quick and reliable screening test.",
    },
    {
        id: "s_pneumoniae", group: "gpc_chain", groupLabel: "GPC in Chain", groupColor: "#34d399",
        name: "Streptococcus pneumoniae", thai: "สเตรป นิวโมเนีย",
        gram: "+", morphology: "Cocci", arrangement: "Diplococci (lancet-shaped pairs)",
        tags: ["pneumonia", "meningitis", "optochin", "bile soluble", "encapsulated"],
        clinicalInfo: {
            naturalHabitat: "Nasopharynx (~40% colonization in children, lower in adults)",
            diseases: ["Community-acquired pneumonia (CAP) — most common cause", "Bacterial meningitis (adults)", "Otitis media (children — most common cause)", "Sinusitis", "Bacteremia"],
            transmission: "Respiratory droplets; nasopharyngeal carrier state",
            notableFactors: "Polysaccharide capsule (84 serotypes); Pneumolysin; Teichoic acid; Autolysin; IgA protease",
        },
        colony: { BAP: "Small 1 mm, grey-white, α-hemolytic; 'draughtsman/coin/dimpled' colony due to autolysis in older cultures; mucoid if heavily encapsulated" },
        gram_stain: "GPC in lancet-shaped pairs (diplococci); may appear as short chains; encapsulated",
        key_biochem: [
            { test: "Catalase", result: "−", note: "" },
            { test: "Hemolysis", result: "α (green)", note: "Partial oxidation of Hb" },
            { test: "Optochin", result: "S (zone ≥14mm)", note: "Key — inhibits pneumococcal ATPase" },
            { test: "Bile solubility", result: "+", note: "Sodium deoxycholate activates autolysin" },
            { test: "Quellung reaction", result: "+", note: "Capsule swelling with antisera" },
            { test: "Inulin fermentation", result: "+", note: "" },
        ],
        media: ["Blood agar (BAP)", "Chocolate agar", "5% CO₂ essential"],
        condition: "35–37°C, 5% CO₂, 18–24h; sensitive to drying and cold",
        importance: "critical",
        notes: "If optochin intermediate (6–13mm), perform bile solubility test. Penicillin resistance increasing — check MIC. Vaccines: PCV15/PCV20, PPSV23.",
    },
    {
        id: "e_faecalis", group: "gpc_chain", groupLabel: "GPC in Chain", groupColor: "#34d399",
        name: "Enterococcus faecalis", thai: "เอ็นเทอโรค็อกคัส ฟีคาลิส",
        gram: "+", morphology: "Cocci", arrangement: "Pairs/short chains",
        tags: ["UTI", "VRE", "nosocomial", "Group D", "bile esculin"],
        clinicalInfo: {
            naturalHabitat: "Normal GI flora; vagina, periurethral area",
            diseases: ["Urinary tract infection (UTI) — 2nd most common cause of nosocomial UTI", "Bacteremia (often catheter-related)", "Infective endocarditis", "Intra-abdominal infection"],
            transmission: "Endogenous; fecal-oral; person-to-person in hospitals",
            notableFactors: "Intrinsically resistant to cephalosporins, clindamycin, TMP-SMX; VRE (vanA, vanB, vanC genes)",
        },
        colony: { BAP: "Small grey-white, γ (no) or α hemolysis, 1–2 mm" },
        gram_stain: "GPC in pairs/short chains",
        key_biochem: [
            { test: "Catalase", result: "−", note: "" },
            { test: "Bile esculin", result: "+", note: "Both Group D Strep and Enterococcus" },
            { test: "6.5% NaCl growth", result: "+", note: "KEY — distinguishes Enterococcus from non-enterococcal Group D" },
            { test: "PYR", result: "+", note: "" },
            { test: "Growth at 45°C", result: "+", note: "" },
            { test: "Sorbitol", result: "+", note: "vs E. faecium = −" },
            { test: "Lancefield", result: "Group D", note: "" },
        ],
        media: ["Blood agar (BAP)", "Bile esculin agar", "Enterococcus selective agar"],
        condition: "35–37°C, 18–24h; grows at 10°C–45°C, tolerates 6.5% NaCl and 60°C for 30min",
        importance: "high",
        notes: "6.5% NaCl growth is KEY differentiator from Group D Strep (S. bovis). VRE is major clinical problem — vanA = high level resistance to vancomycin AND teicoplanin.",
    },

    // ══════════════════════════════════════════════════════
    // GROUP 3: GRAM POSITIVE BACILLI
    // ══════════════════════════════════════════════════════
    {
        id: "b_cereus", group: "gpb", groupLabel: "GP Bacilli", groupColor: "#fb923c",
        name: "Bacillus cereus", thai: "บาซิลลัส ซีเรียส",
        gram: "+", morphology: "Large rods", arrangement: "Chains ('bamboo rod')",
        tags: ["spore former", "β-hemolysis", "motile", "lecithinase+", "food poisoning"],
        clinicalInfo: {
            naturalHabitat: "Soil, food (rice, vegetables, spices); environment",
            diseases: ["Food poisoning: emetic type (B toxin, fried rice) or diarrheal type (enterotoxin)", "Wound infections", "Bacteremia (IV drug users, immunocompromised)", "Severe eye infections (post-trauma)"],
            transmission: "Contaminated food (reheated rice especially); wound contamination",
            notableFactors: "Emetic toxin (cereulide): heat-stable, preformed in food; Diarrheal enterotoxin: heat-labile; Lecithinase (phospholipase C)",
        },
        colony: { BAP: "Large, grey-white, rough or irregular, strong β-hemolysis; spreading; 3–5mm", MCA: "No/poor growth", XLD: "No growth", TCBS: "No growth" },
        gram_stain: "Large GPB (1 × 3–5 µm) in long chains; subterminal oval spores that do NOT swell cell",
        key_biochem: [
            { test: "Catalase", result: "+", note: "" },
            { test: "Hemolysis", result: "β (strong)", note: "KEY vs B. anthracis (γ)" },
            { test: "Indole", result: "−", note: "" },
            { test: "Motile", result: "+", note: "KEY vs B. anthracis (non-motile)" },
            { test: "Lecithinase (egg yolk)", result: "+", note: "KEY vs B. anthracis (−)" },
            { test: "Nitrate", result: "+", note: "" },
            { test: "Glucose", result: "+", note: "" },
            { test: "Sucrose", result: "+", note: "" },
            { test: "Xylose", result: "−", note: "" },
            { test: "Esculin", result: "+", note: "" },
            { test: "Spore formation", result: "+", note: "Subterminal, oval" },
            { test: "γ-phage lysis", result: "−", note: "vs B. anthracis (+)" },
        ],
        media: ["Blood agar (BAP)", "Mannitol Egg Yolk Polymyxin (MYP) agar (selective)", "PEMBA agar"],
        condition: "25–37°C, aerobic; forms spores readily",
        importance: "moderate",
        notes: "β-hemolysis + motile + lecithinase+ = B. cereus (vs B. anthracis γ-hemolysis, non-motile, lecithinase−). Two types of food poisoning: emetic (1–5h, vomiting) from heat-stable toxin in fried rice; diarrheal (8–16h) from heat-labile enterotoxin. MYP agar shows lecithinase+ (halo around colony).",
    },
    {
        id: "l_monocytogenes", group: "gpb", groupLabel: "GP Bacilli", groupColor: "#fb923c",
        name: "Listeria monocytogenes", thai: "ลิสทีเรีย โมโนไซโทจีเนส",
        gram: "+", morphology: "Short rods / coccobacilli", arrangement: "Single, V/L shapes",
        tags: ["cold enrichment", "meningitis", "food-borne", "CAMP+", "tumbling motility"],
        clinicalInfo: {
            naturalHabitat: "Soil, water, plants, animal GI tracts; food (soft cheese, deli meats, smoked fish)",
            diseases: ["Meningitis in neonates, elderly, immunocompromised", "Neonatal sepsis", "Granulomatosis infantiseptica (neonatal)", "Bacteremia in immunocompromised / pregnant women", "Gastroenteritis (healthy individuals)"],
            transmission: "Contaminated food; vertical (mother → neonate); environment",
            notableFactors: "Listeriolysin O (LLO) — pore-forming toxin; grows at 4°C (cold enrichment); InlA/InlB invasins; ActA (actin-based motility)",
        },
        colony: {
            BAP: "Small grey-white, 1–2 mm, narrow β-hemolysis zone at 35–37°C; enhanced β-hemolysis after cold enrichment at 4°C",
            special: "Umbrella/inverted umbrella motility pattern in semisolid agar at 25°C (not 37°C)",
        },
        gram_stain: "Small GP short rods (coccobacilli 0.4–0.5 × 1–2 µm); may form V or L-shaped arrangements; can be confused with Streptococcus",
        key_biochem: [
            { test: "Catalase", result: "+", note: "Distinguishes from Erysipelothrix" },
            { test: "Oxidase", result: "−", note: "" },
            { test: "Motile at 25°C", result: "+", note: "Tumbling/umbrella in semisolid" },
            { test: "Motile at 37°C", result: "−/weak", note: "" },
            { test: "Hemolysis", result: "β (narrow)", note: "" },
            { test: "TSI", result: "−", note: "Not used for Listeria" },
            { test: "Nitrate", result: "−", note: "" },
            { test: "Glucose", result: "+", note: "" },
            { test: "Maltose", result: "NA", note: "" },
            { test: "Sucrose", result: "−", note: "" },
            { test: "Xylose", result: "−", note: "" },
            { test: "Esculin", result: "+", note: "" },
            { test: "Urease", result: "−", note: "" },
            { test: "CAMP test", result: "+", note: "Synergistic with S. aureus" },
            { test: "Hippurate hydrolysis", result: "+", note: "" },
            { test: "Rhamnose", result: "+", note: "vs L. innocua = −" },
            { test: "H₂S (TSI)", result: "−", note: "vs Erysipelothrix = +" },
        ],
        media: ["Blood agar (BAP)", "Oxford agar / PALCAM (selective)", "Cold enrichment broth at 4°C (for food samples)"],
        condition: "35–37°C, aerobic/facultative; notably grows at 4°C; enhanced hemolysis in candle jar",
        importance: "critical",
        notes: "Cold enrichment (4°C, 2–6 weeks) for food samples. All cephalosporins intrinsically resistant. Treat with ampicillin ± gentamicin. High mortality in neonates and immunocompromised.",
    },
    {
        id: "b_anthracis", group: "gpb", groupLabel: "GP Bacilli", groupColor: "#fb923c",
        name: "Bacillus anthracis", thai: "บาซิลลัส แอนทราซิส",
        gram: "+", morphology: "Large rods", arrangement: "Chains ('bamboo rod')",
        tags: ["anthrax", "bioterrorism", "spore former", "non-motile", "gamma phage"],
        clinicalInfo: {
            naturalHabitat: "Soil; sporulates in environment; infects herbivores (cattle, sheep, goats)",
            diseases: ["Cutaneous anthrax (most common, 95%): painless eschar", "Inhalation anthrax (most lethal): mediastinal widening, hemorrhagic meningitis", "GI anthrax: food-borne, hemorrhagic enteritis"],
            transmission: "Contact with infected animals/animal products; inhalation of spores; bioterrorism",
            notableFactors: "Tripartite exotoxin: Protective Antigen (PA) + Lethal Factor (LF) + Edema Factor (EF); D-glutamic acid capsule (antiphagocytic)",
        },
        colony: { BAP: "Large 2–5 mm, grey-white, rough, dry; 'Medusa head' or 'lion's mane' appearance; NON-HEMOLYTIC (γ) — key distinction from B. cereus" },
        gram_stain: "Large GPB (1 × 3–5 µm) in long chains ('bamboo rods'); central/subterminal oval spores that do NOT swell the cell",
        key_biochem: [
            { test: "Catalase", result: "+", note: "" },
            { test: "Hemolysis", result: "γ (non-hemolytic)", note: "KEY vs B. cereus (β-hemolysis)" },
            { test: "Indole", result: "−", note: "" },
            { test: "Motile", result: "−", note: "KEY — non-motile unlike B. cereus" },
            { test: "Lecithinase", result: "−", note: "vs B. cereus (+)" },
            { test: "Nitrate", result: "+", note: "" },
            { test: "Glucose", result: "+", note: "" },
            { test: "Sucrose", result: "−", note: "" },
            { test: "Xylose", result: "−", note: "" },
            { test: "Esculin", result: "+", note: "" },
            { test: "Spore formation", result: "+", note: "Central/subterminal, oval; cell diameter >1µm" },
            { test: "γ-phage lysis", result: "+", note: "Specific for B. anthracis" },
            { test: "String of pearls (penicillin)", result: "+", note: "" },
            { test: "Capsule (CO₂ medium)", result: "+", note: "D-polyglutamic acid" },
        ],
        media: ["Blood agar (BAP)", "Bicarbonate agar in CO₂ (capsule production)"],
        condition: "35–37°C, aerobic; BSL-2 or BSL-3 depending on procedure",
        importance: "critical",
        notes: "⚠️ BIOTERRORISM AGENT. Non-motile + non-hemolytic + γ-phage lysis = B. anthracis. Notify public health immediately. Treat with ciprofloxacin or doxycycline.",
    },
    {
        id: "c_diphtheriae", group: "gpb", groupLabel: "GP Bacilli", groupColor: "#fb923c",
        name: "Corynebacterium diphtheriae", thai: "โคริเนแบคทีเรียม ดิฟทีเรีย",
        gram: "+", morphology: "Pleomorphic rods (club-shaped)", arrangement: "Palisade / 'Chinese letters'",
        tags: ["diphtheria", "exotoxin", "pseudomembrane", "Albert stain", "Elek test"],
        clinicalInfo: {
            naturalHabitat: "Upper respiratory tract / skin of humans (carrier state)",
            diseases: ["Respiratory diphtheria: grey pseudomembrane in pharynx/larynx → airway obstruction", "Cutaneous diphtheria: chronic skin ulcer", "Systemic toxin effects: myocarditis (leading cause of death), peripheral neuropathy, renal tubular necrosis"],
            transmission: "Respiratory droplets; direct contact with skin lesions",
            notableFactors: "Diphtheria toxin (encoded by bacteriophage β): ADP-ribosylation of EF-2 → protein synthesis inhibition → cell death",
        },
        colony: {
            BAP: "Small grey, may have narrow β-hemolysis",
            CTBA: "Black colonies (tellurite reduction) — 3 biotypes: gravis (large, grey, irregular), mitis (small, black, smooth), intermedius",
            Loeffler: "Metachromatic granules best seen"
        },
        gram_stain: "Pleomorphic GPB (club-shaped ends); palisade arrangement; 'Chinese letters' pattern; metachromatic granules with Albert stain (blue-black granules vs green cytoplasm)",
        key_biochem: [
            { test: "Catalase", result: "+", note: "" },
            { test: "Oxidase", result: "−", note: "" },
            { test: "Motile", result: "−", note: "" },
            { test: "TSI", result: "−", note: "Not used" },
            { test: "Hemolysis", result: "γ or narrow β", note: "" },
            { test: "Nitrate", result: "+", note: "" },
            { test: "Glucose", result: "+", note: "" },
            { test: "Maltose", result: "+", note: "" },
            { test: "Sucrose", result: "−", note: "KEY vs other Corynebacterium" },
            { test: "Xylose", result: "−", note: "" },
            { test: "Esculin", result: "−", note: "" },
            { test: "Urease", result: "−", note: "" },
            { test: "Cystinase (Tinsdale agar)", result: "+", note: "Brown halo around colony" },
            { test: "Elek test (toxin)", result: "+", note: "Confirm C. diphtheriae" },
            { test: "Albert stain", result: "+", note: "Metachromatic granules" },
            { test: "CAMP test", result: "−", note: "" },
        ],
        media: ["Blood agar (BAP)", "Tellurite blood agar (CTBA) — selective", "Loeffler serum slant — granules", "Tinsdale agar — halo test"],
        condition: "35–37°C, aerobic, 24–48h",
        importance: "critical",
        notes: "ELEK TEST confirms toxin production. Treat with antitoxin (neutralizes free toxin) + antibiotics (penicillin or erythromycin). DTP vaccine prevents disease. Notifiable disease.",
    },

    // ══════════════════════════════════════════════════════
    // GROUP 4: ENTEROBACTERALES
    // ══════════════════════════════════════════════════════
    {
        id: "e_coli", group: "enterobacterales", groupLabel: "Enterobacterales", groupColor: "#f87171",
        name: "Escherichia coli", thai: "เอสเชอริเชีย โคไล",
        gram: "−", morphology: "Rods", arrangement: "Single",
        tags: ["UTI", "meningitis", "diarrhea", "LF", "IMViC ++--"],
        clinicalInfo: {
            naturalHabitat: "Normal GI flora (colon); also found in soil, water",
            diseases: ["UTI (most common cause, 80%)", "Neonatal meningitis (K1 antigen)", "Diarrheal diseases: ETEC (traveller's), EPEC (infants), EHEC O157:H7 (HUS), EIEC, EAEC", "Bacteremia/sepsis", "Intra-abdominal infections"],
            transmission: "Fecal-oral; contaminated water/food; sexual contact; UTI (uropathogenic)",
            notableFactors: "ETEC: LT and ST enterotoxins; EHEC: Shiga toxin 1&2 (HUS); K1 capsule (meningitis); P fimbriae (pyelonephritis)",
        },
        colony: { BAP: "Large (2–3 mm), grey-white, flat, γ-hemolysis (most strains); some β-hemolytic", MCA: "Pink (LF) — lactose fermenting; moist, slightly raised, with precipitation halo" },
        gram_stain: "GNB (0.4–0.7 × 1–3 µm), typical bacilli",
        key_biochem: [
            { test: "Oxidase", result: "−", note: "" },
            { test: "TSI", result: "A/AG", note: "Acid slant / acid butt + gas" },
            { test: "Indole", result: "+", note: "Tryptophanase positive" },
            { test: "MR (Methyl Red)", result: "+", note: "" },
            { test: "VP (Voges-Proskauer)", result: "−", note: "" },
            { test: "Citrate", result: "−", note: "" },
            { test: "Urease", result: "−", note: "" },
            { test: "Motile", result: "+", note: "Peritrichous flagella" },
            { test: "LD (Lysine)", result: "+", note: "" },
            { test: "OD (Ornithine)", result: "+", note: "" },
            { test: "PD (Phenylalanine)", result: "−", note: "Not PD group" },
            { test: "Malonate", result: "−", note: "" },
            { test: "Gas from glucose", result: "+", note: "" },
            { test: "Mannitol", result: "+", note: "" },
            { test: "Arabinose", result: "+", note: "" },
            { test: "Lactose (MCA)", result: "LF (pink)", note: "" },
            { test: "H₂S", result: "−", note: "" },
        ],
        media: ["Blood agar (BAP)", "MacConkey (MCA)", "EMB agar (metallic green sheen — classic)", "XLD agar"],
        condition: "35–37°C, aerobic, 18–24h",
        importance: "high",
        notes: "IMViC pattern ++ - - is classic for E. coli. EMB agar: metallic green sheen is almost diagnostic. EHEC O157:H7 does NOT ferment sorbitol (use SMAC agar for screening).",
    },
    {
        id: "salmonella_spp", group: "enterobacterales", groupLabel: "Enterobacterales", groupColor: "#f87171",
        name: "Salmonella spp.", thai: "ซาลโมเนลลา",
        gram: "−", morphology: "Rods", arrangement: "Single",
        tags: ["salmonellosis", "typhoid", "H2S", "NLF", "serotyping"],
        clinicalInfo: {
            naturalHabitat: "GI tract of humans and animals; poultry, eggs, reptiles",
            diseases: ["Gastroenteritis (most serovars): self-limiting, watery diarrhea", "Typhoid/enteric fever (S. Typhi, S. Paratyphi A): bacteremia, rose spots, relative bradycardia", "Bacteremia: especially S. choleraesuis", "Focal infections: osteomyelitis (sickle cell patients)"],
            transmission: "Contaminated food (poultry, eggs, raw meat); fecal-oral; zoonotic",
            notableFactors: "Vi antigen (S. Typhi); Flagellar H antigen variation; Lipopolysaccharide O antigen (basis of Kauffmann-White scheme)",
        },
        colony: { BAP: "Grey, medium 2–3 mm, γ-hemolysis", MCA: "NLF (colorless)", SSA: "NLF with black center (H₂S + Fe²⁺)" },
        gram_stain: "GNB, similar to E. coli",
        key_biochem: [
            { test: "Oxidase", result: "−", note: "" },
            { test: "TSI (most)", result: "K/AG H₂S 3+", note: "Alkaline slant, acid butt + gas + heavy H₂S" },
            { test: "TSI (S. Typhi)", result: "K/A H₂S 1+", note: "No gas, slight H₂S only" },
            { test: "Indole", result: "−", note: "" },
            { test: "MR", result: "+", note: "" },
            { test: "VP", result: "−", note: "" },
            { test: "Citrate", result: "+", note: "" },
            { test: "Urease", result: "−", note: "Important! vs Proteus = +" },
            { test: "Motile", result: "+", note: "Peritrichous (except Gallinarum/Pullorum)" },
            { test: "LD (Lysine)", result: "+", note: "" },
            { test: "OD (Ornithine)", result: "+", note: "" },
            { test: "PD", result: "−", note: "Not PD group" },
            { test: "Malonate", result: "−", note: "" },
            { test: "Gas from glucose", result: "+ (most)", note: "Not S. Typhi" },
            { test: "H₂S", result: "+++ (heavy)", note: "" },
            { test: "Mannitol", result: "+", note: "vs E. tarda = −" },
            { test: "Arabinose", result: "+", note: "" },
        ],
        media: ["MacConkey (MCA)", "SS agar (black colony)", "XLD agar", "Selenite F broth (enrichment)", "GN broth"],
        condition: "35–37°C, aerobic, 18–24h; enrichment 24h then subculture",
        importance: "critical",
        notes: "After biochemical ID → SEROTYPING (Kauffmann-White scheme) required for final report. S. Typhi: no gas in TSI, only 1+ H₂S. Widal test for serology (limited sensitivity/specificity). Typhoid — reportable disease.",
    },
    {
        id: "klebsiella_pneumoniae", group: "enterobacterales", groupLabel: "Enterobacterales", groupColor: "#f87171",
        name: "Klebsiella pneumoniae", thai: "เคลปซิเอลลา นิวโมเนีย",
        gram: "−", morphology: "Rods", arrangement: "Single/pairs",
        tags: ["ESKAPE", "nosocomial", "mucoid", "KPC", "CRKP"],
        clinicalInfo: {
            naturalHabitat: "GI tract normal flora; respiratory tract of hospitalized patients",
            diseases: ["Hospital-acquired pneumonia (classic: 'currant jelly sputum')", "UTI (catheter-associated)", "Bacteremia/sepsis", "Liver abscess (especially in diabetics in Asia)", "Wound infection", "Meningitis"],
            transmission: "Endogenous; healthcare setting (contaminated equipment, hands)",
            notableFactors: "Large polysaccharide capsule (mucoid); NDM, KPC, OXA-48 carbapenemases (CRKP); Hypervirulent strains (hvKP): liver abscess in healthy patients",
        },
        colony: { BAP: "Large (3–5 mm), mucoid, viscous, dome-shaped — 'string test' positive (stretch >5 mm)", MCA: "LF (pink) — large mucoid colonies — very distinctive" },
        gram_stain: "GNB, often encapsulated (capsule artifact during smear preparation); non-motile",
        key_biochem: [
            { test: "Oxidase", result: "−", note: "" },
            { test: "TSI", result: "A/AG", note: "" },
            { test: "Indole", result: "−", note: "vs K. oxytoca = +" },
            { test: "MR", result: "−", note: "" },
            { test: "VP", result: "+", note: "" },
            { test: "Citrate", result: "+", note: "" },
            { test: "Urease", result: "+", note: "" },
            { test: "Motile", result: "−", note: "KEY — non-motile" },
            { test: "LD (Lysine)", result: "+", note: "" },
            { test: "OD (Ornithine)", result: "−", note: "KEY vs Enterobacter (OD+)" },
            { test: "PD", result: "−", note: "" },
            { test: "Malonate", result: "+", note: "" },
            { test: "Gas from glucose", result: "+", note: "" },
            { test: "Mannitol", result: "+", note: "" },
            { test: "Arabinose", result: "+", note: "" },
            { test: "Lactose (MCA)", result: "LF (large mucoid!)", note: "" },
        ],
        media: ["Blood agar (BAP)", "MacConkey (MCA)", "Chromogenic agar for CRKP screening"],
        condition: "35–37°C, aerobic, 18–24h",
        importance: "critical",
        notes: "ESKAPE pathogen. String test (mucoid): pull colony with loop >5mm = K. pneumoniae. CRKP (carbapenem-resistant) is major global threat. K. oxytoca = Indole+ differentiates from K. pneumoniae.",
    },
    {
        id: "pseudomonas_aeruginosa_entero", group: "enterobacterales", groupLabel: "Enterobacterales", groupColor: "#f87171",
        name: "Proteus mirabilis", thai: "โปรทีอัส มิราบิลิส",
        gram: "−", morphology: "Rods", arrangement: "Single",
        tags: ["swarming", "urease", "H2S", "UTI", "struvite stones"],
        clinicalInfo: {
            naturalHabitat: "Soil, water, GI tract of humans and animals",
            diseases: ["UTI (common — especially catheter-associated)", "Wound infections", "Bacteremia", "Struvite kidney stones (urease splits urea → NH₃ → alkaline urine → crystal precipitation)"],
            transmission: "Endogenous; fecal contamination; healthcare setting",
            notableFactors: "Powerful urease (rapid urea split); swarming motility; H₂S production; peritrichous flagella",
        },
        colony: { BAP: "Characteristic SWARMING over entire plate (concentric circles); grey-brown; pungent odor; γ-hemolysis", MCA: "NLF (colorless/translucent)" },
        gram_stain: "GNB, highly pleomorphic (short rods to filaments during swarming)",
        key_biochem: [
            { test: "Oxidase", result: "−", note: "" },
            { test: "TSI", result: "K/AG H₂S", note: "" },
            { test: "Indole", result: "−", note: "vs P. vulgaris = +" },
            { test: "MR", result: "+", note: "" },
            { test: "VP", result: "−", note: "" },
            { test: "Citrate", result: "+", note: "" },
            { test: "Urease", result: "++ (rapid)", note: "Strong positive in minutes — KEY!" },
            { test: "Motile", result: "+ (swarming!)", note: "" },
            { test: "LD (Lysine)", result: "−", note: "" },
            { test: "OD (Ornithine)", result: "−", note: "" },
            { test: "PD (Phenylalanine)", result: "+", note: "KEY — PD group (Proteus/Providencia/Morganella)" },
            { test: "Malonate", result: "−", note: "" },
            { test: "Gas from glucose", result: "+", note: "" },
            { test: "H₂S", result: "+", note: "" },
            { test: "Mannitol", result: "−", note: "" },
            { test: "Arabinose", result: "−", note: "" },
        ],
        media: ["Blood agar (BAP — watch for swarming)", "MacConkey (MCA)"],
        condition: "35–37°C, aerobic; swarming inhibited by 1% agar or bile salts (MCA)",
        importance: "moderate",
        notes: "Swarming on BAP is dramatic and distinctive. Rapid urease test (minutes). P. vulgaris differs: Indole+, Mannitol+/−. Associated with alkaline urine pH and struvite calculi.",
    },

    // ══════════════════════════════════════════════════════
    // GROUP 5: VIBRIONACEAE
    // ══════════════════════════════════════════════════════
    {
        id: "v_cholerae", group: "vibrio", groupLabel: "Vibrionaceae", groupColor: "#38bdf8",
        name: "Vibrio cholerae", thai: "วิบริโอ โคเลรี",
        gram: "−", morphology: "Curved rods (comma-shaped)", arrangement: "Single",
        tags: ["cholera", "rice-water stool", "TCBS yellow", "O1/O139", "pandemic"],
        clinicalInfo: {
            naturalHabitat: "Aquatic environments (estuaries, coastal waters); plankton-associated",
            diseases: ["Cholera: profuse watery diarrhea ('rice-water stool'), vomiting → rapid dehydration, electrolyte imbalance → death within hours if untreated", "Mild gastroenteritis (non-O1/O139 strains)"],
            transmission: "Contaminated water and seafood; fecal-oral",
            notableFactors: "Cholera toxin (CT): ADP-ribosylation of Gs protein → cAMP ↑ → Cl⁻ secretion → massive watery diarrhea; TCP (toxin co-regulated pilus) for colonization; 7 pandemics (current = El Tor O1)",
        },
        colony: { TCBS: "YELLOW — sucrose fermenting (key ID)", BAP: "Large, grey, β-hemolytic (El Tor strains); non-hemolytic (classical)" },
        gram_stain: "GN curved rods (comma/vibrio shape); single polar flagellum; 'shooting star' motility",
        key_biochem: [
            { test: "Oxidase", result: "+", note: "" },
            { test: "TCBS colony", result: "Yellow (sucrose+)", note: "" },
            { test: "TSI", result: "A/A", note: "" },
            { test: "Sucrose", result: "+", note: "Yellow TCBS" },
            { test: "Gas from glucose", result: "−", note: "" },
            { test: "0% NaCl growth", result: "+", note: "Unique — does not require NaCl" },
            { test: "1% NaCl growth", result: "+", note: "" },
            { test: "6% NaCl growth", result: "±", note: "" },
            { test: "8% NaCl growth", result: "−", note: "" },
            { test: "10% NaCl growth", result: "−", note: "" },
            { test: "LD (1%NaCl)", result: "+", note: "" },
            { test: "OD (1%NaCl)", result: "+", note: "" },
            { test: "AD (1%NaCl)", result: "−", note: "" },
            { test: "VP (1%NaCl)", result: "±", note: "" },
            { test: "Mannitol", result: "+", note: "" },
            { test: "Lactose", result: "−", note: "" },
            { test: "Arabinose", result: "−", note: "" },
            { test: "Sorbitol", result: "−", note: "" },
            { test: "Inositol", result: "+", note: "" },
            { test: "O1/O139 agglutination", result: "+", note: "Required for cholera ID" },
        ],
        media: ["TCBS agar (selective)", "Blood agar (BAP)", "Alkaline peptone water pH 8.5 (enrichment)"],
        condition: "35–37°C, aerobic; grows in alkaline pH 8–9; 0.5% NaCl optimal",
        importance: "critical",
        notes: "REPORTABLE DISEASE. Only Vibrio that grows without NaCl. O1 El Tor = current pandemic strain. O139 Bengal = new epidemic strain. ORS (oral rehydration) is cornerstone of treatment. Antibiotics shorten illness.",
    },
    {
        id: "v_parahaemolyticus", group: "vibrio", groupLabel: "Vibrionaceae", groupColor: "#38bdf8",
        name: "Vibrio parahaemolyticus", thai: "วิบริโอ พาราฮีโมลิติคัส",
        gram: "−", morphology: "Curved rods", arrangement: "Single",
        tags: ["seafood", "gastroenteritis", "TCBS green", "Kanagawa"],
        clinicalInfo: {
            naturalHabitat: "Coastal and estuarine waters; raw shellfish (oysters, clams, shrimp)",
            diseases: ["Acute gastroenteritis after raw/undercooked seafood: watery to bloody diarrhea, 4–96h incubation", "Wound infection (saltwater exposure)", "Rarely: bacteremia (immunocompromised)"],
            transmission: "Ingestion of raw/undercooked seafood; wound contact with seawater",
            notableFactors: "Thermostable direct hemolysin (TDH = Kanagawa hemolysin): Kanagawa test +; TRH (TDH-related hemolysin)",
        },
        colony: { TCBS: "GREEN — sucrose negative (key ID)", BAP: "Small, round, β-hemolytic (Kanagawa+ strains)" },
        gram_stain: "GN curved rods",
        key_biochem: [
            { test: "Oxidase", result: "+", note: "" },
            { test: "TCBS colony", result: "Green (sucrose−)", note: "KEY" },
            { test: "TSI", result: "K/A", note: "" },
            { test: "Sucrose", result: "−", note: "Green TCBS" },
            { test: "Gas from glucose", result: "−", note: "" },
            { test: "0% NaCl growth", result: "−", note: "Requires NaCl" },
            { test: "1% NaCl growth", result: "+", note: "" },
            { test: "6% NaCl growth", result: "+", note: "" },
            { test: "8% NaCl growth", result: "±", note: "" },
            { test: "10% NaCl growth", result: "−", note: "" },
            { test: "LD (1%NaCl)", result: "+", note: "" },
            { test: "OD (1%NaCl)", result: "+", note: "" },
            { test: "AD (1%NaCl)", result: "−", note: "" },
            { test: "VP (1%NaCl)", result: "−", note: "" },
            { test: "Mannitol", result: "+", note: "" },
            { test: "Lactose", result: "−", note: "" },
            { test: "Arabinose", result: "+", note: "KEY vs V. vulnificus (−)" },
            { test: "Sorbitol", result: "+", note: "" },
            { test: "Inositol", result: "−", note: "" },
            { test: "Kanagawa test", result: "+/−", note: "Wagatsuma agar β-hemolysis" },
        ],
        media: ["TCBS agar", "3% NaCl blood agar", "Alkaline peptone water (enrichment)"],
        condition: "35–37°C; requires 1–3% NaCl for growth",
        importance: "high",
        notes: "Most common seafood-associated gastroenteritis in Japan and Southeast Asia. Kanagawa test uses Wagatsuma agar (human blood). Treatment: usually self-limiting; severe cases use tetracycline or fluoroquinolone.",
    },

    // ══════════════════════════════════════════════════════
    // GROUP 6: NFB
    // ══════════════════════════════════════════════════════
    {
        id: "p_aeruginosa", group: "nfb", groupLabel: "NFB", groupColor: "#22d3ee",
        name: "Pseudomonas aeruginosa", thai: "ซูโดโมแนส แอรูจิโนซา",
        gram: "−", morphology: "Rods", arrangement: "Single/pairs",
        tags: ["ESKAPE", "cystic fibrosis", "burn wounds", "pyocyanin", "nosocomial"],
        clinicalInfo: {
            naturalHabitat: "Soil, water, plant material; moist hospital environments (sinks, ventilators, whirlpools)",
            diseases: ["Ventilator-associated pneumonia (VAP)", "Cystic fibrosis lung infections (chronic)", "Burn wound infections", "Bacteremia in neutropenic/immunocompromised", "Otitis externa ('swimmer's ear')", "Corneal ulcer (contact lens users)", "UTI (catheter-associated)", "Ecthyma gangrenosum (skin lesion in bacteremia)"],
            transmission: "Nosocomial; environmental; endogenous",
            notableFactors: "Pyocyanin (blue-green pigment, virulence factor); Pyoverdin (fluorescent siderophore); Exotoxin A; Alginate biofilm; Intrinsic resistance (AmpC β-lactamase, efflux pumps, porin mutation); MDR/XDR strains",
        },
        colony: {
            BAP: "Large, flat, spreading, grey-green; characteristic metallic sheen; β-hemolysis; grape/musty/sweet corn odor",
            MCA: "NLF — grows well; NLF (colorless/translucent)",
            special: "Blue-green (pyocyanin) or fluorescent green (pyoverdin) pigment production"
        },
        gram_stain: "GNB, slender rods",
        key_biochem: [
            { test: "Oxidase", result: "+", note: "" },
            { test: "TSI", result: "K/N (no change)", note: "Non-fermentative" },
            { test: "Motile", result: "+", note: "Polar monotrichous flagellum" },
            { test: "Indole", result: "−", note: "" },
            { test: "King P (pyocyanin)", result: "+", note: "Blue-green pigment" },
            { test: "King F (fluorescein)", result: "+", note: "Yellow-green fluorescent" },
            { test: "Urease", result: "+/−", note: "" },
            { test: "Nitrate reduction", result: "+", note: "" },
            { test: "N₂ gas from NO₃", result: "+", note: "Denitrification" },
            { test: "Growth at 42°C", result: "+", note: "KEY vs P. fluorescens/putida" },
            { test: "Esculin", result: "−", note: "KEY vs Burkholderia (Esculin+)" },
            { test: "DNase", result: "−", note: "" },
            { test: "Gelatin", result: "+", note: "" },
            { test: "Starch", result: "−", note: "vs P. stutzeri (+)" },
            { test: "6.5% NaCl", result: "+", note: "" },
            { test: "Glucose O/F", result: "O (oxidative)", note: "" },
            { test: "Xylose", result: "+", note: "" },
            { test: "Mannitol", result: "+/−", note: "" },
            { test: "Lactose", result: "−", note: "" },
            { test: "Maltose", result: "−", note: "" },
            { test: "Sucrose", result: "−", note: "" },
        ],
        media: ["Blood agar (BAP)", "MacConkey (MCA)", "King P agar (pyocyanin)", "King B agar (fluorescein)", "Cetrimide agar (selective)"],
        condition: "35–42°C, aerobic; grows best at 37°C; characteristic odor",
        importance: "critical",
        notes: "ESKAPE pathogen. Pyocyanin (blue-green water-soluble pigment) is highly characteristic. MDR/XDR is major concern. Treatment: antipseudomonal penicillin + aminoglycoside; carbapenems (but resistance increasing). Intrinsically resistant to many antibiotics.",
    },
    {
        id: "b_pseudomallei", group: "nfb", groupLabel: "NFB", groupColor: "#22d3ee",
        name: "Burkholderia pseudomallei", thai: "เบิร์คโฮลเดอเรีย ซูโดมัลเลอิ",
        gram: "−", morphology: "Rods (safety pin shape)", arrangement: "Single",
        tags: ["melioidosis", "Thailand endemic", "safety pin", "BSL3", "soil"],
        clinicalInfo: {
            naturalHabitat: "Soil and water in tropical regions; highly endemic in Thailand, SE Asia, Northern Australia",
            diseases: ["Melioidosis: pneumonia, bacteremia, septicemia", "Localised infection: skin, bone", "Septic shock (mortality up to 50%)", "Recurrent/relapsing disease"],
            transmission: "Inhalation of contaminated soil/dust; skin inoculation; ingestion of contaminated water; NOT person-to-person",
            notableFactors: "Intracellular survival; T3SS and T6SS; capsular polysaccharide; Biphasic (oxidative and fermentative); Intrinsic resistance to penicillin, aminoglycosides",
        },
        colony: { BAP: "Wrinkled, dry, irregular colony (48–72h); earthy/musty odor; small, dull at 24h", MCA: "NLF (grows)" },
        gram_stain: "GNB with 'safety pin' bipolar staining (darker at poles) on direct smear; Wayson or methylene blue stain best",
        key_biochem: [
            { test: "Oxidase", result: "+", note: "" },
            { test: "TSI", result: "K/N or A/A (fermentative!)", note: "Unusual for NFB" },
            { test: "Motile", result: "+", note: "Polar flagella" },
            { test: "Indole", result: "−", note: "" },
            { test: "King P", result: "−", note: "" },
            { test: "King F", result: "−", note: "" },
            { test: "Urease", result: "−", note: "" },
            { test: "Nitrate reduction", result: "+", note: "" },
            { test: "N₂ gas from NO₃", result: "+", note: "" },
            { test: "Growth at 42°C", result: "−", note: "" },
            { test: "Esculin", result: "+", note: "KEY vs P. aeruginosa (−)" },
            { test: "DNase", result: "−", note: "" },
            { test: "Gelatin", result: "+", note: "" },
            { test: "Starch", result: "−", note: "" },
            { test: "6.5% NaCl", result: "±", note: "" },
            { test: "Glucose O/F", result: "F+/O+ (both!)", note: "Fermentative AND oxidative" },
            { test: "Xylose", result: "+", note: "" },
            { test: "Mannitol", result: "+", note: "" },
            { test: "Lactose", result: "+", note: "" },
            { test: "Maltose", result: "+", note: "" },
            { test: "Arabinose", result: "−", note: "KEY vs B. thailandensis (+)" },
            { test: "Sucrose", result: "+", note: "" },
        ],
        media: ["Blood agar (BAP)", "MacConkey (MCA)", "Ashdown agar (selective — crystal violet + gentamicin)", "BHIB broth"],
        condition: "37–42°C, aerobic; requires 48–72h for typical wrinkled morphology; BSL-3",
        importance: "critical",
        notes: "⚠️ ENDEMIC IN THAILAND. BSL-3 organism. Wrinkled colony at 48–72h is characteristic. 'Safety pin' Gram stain from tissue/blood. Melioidosis is underdiagnosed. Treatment: IV ceftazidime or meropenem (intensive), then TMP-SMX (eradication). Relapse common.",
    },
    {
        id: "acinetobacter_baumannii", group: "nfb", groupLabel: "NFB", groupColor: "#22d3ee",
        name: "Acinetobacter baumannii", thai: "อาซิเนโตแบคเตอร์ เบาแมนนิ",
        gram: "−", morphology: "Coccobacilli (may appear GPC!)", arrangement: "Pairs/clusters",
        tags: ["ESKAPE", "CRAB", "nosocomial", "ICU", "coccobacilli"],
        clinicalInfo: {
            naturalHabitat: "Soil, water; hospital environment (survives on dry surfaces for weeks)",
            diseases: ["VAP (ventilator-associated pneumonia)", "Bacteremia/sepsis", "UTI", "Wound and surgical site infection", "Meningitis (post-neurosurgery)"],
            transmission: "Healthcare setting; contaminated equipment and surfaces; healthcare workers' hands",
            notableFactors: "OXA carbapenemases (OXA-23, OXA-24, OXA-51, OXA-58); NDM; biofilm; desiccation-resistant; CRAB (carbapenem-resistant A. baumannii) — WHO critical priority pathogen",
        },
        colony: { BAP: "Large (2–3 mm), grey-white, opaque, smooth; sometimes mucoid or pigmented (pink/purple on MCA)", MCA: "Grows but NLF" },
        gram_stain: "GN coccobacilli (often appears as GPC in clinical smears — Gram stain may look like cocci!); non-motile",
        key_biochem: [
            { test: "Oxidase", result: "−", note: "KEY exception in NFB" },
            { test: "TSI", result: "K/N", note: "" },
            { test: "Motile", result: "−", note: "Non-motile" },
            { test: "Indole", result: "−", note: "" },
            { test: "King P", result: "−", note: "" },
            { test: "King F", result: "−", note: "" },
            { test: "Urease", result: "−/+", note: "" },
            { test: "Nitrate reduction", result: "−", note: "" },
            { test: "N₂ gas", result: "−", note: "" },
            { test: "Growth at 42°C", result: "+", note: "KEY vs A. lwoffii" },
            { test: "Esculin", result: "−", note: "" },
            { test: "DNase", result: "−", note: "" },
            { test: "Gelatin", result: "−", note: "" },
            { test: "Starch", result: "−", note: "" },
            { test: "6.5% NaCl", result: "+/−", note: "" },
            { test: "Glucose O/F", result: "+/− (oxidative)", note: "" },
            { test: "Xylose", result: "+", note: "" },
            { test: "Mannitol", result: "−", note: "" },
            { test: "Lactose", result: "+", note: "KEY vs A. lwoffii (−)" },
            { test: "Maltose", result: "−", note: "" },
            { test: "Sucrose", result: "−", note: "" },
        ],
        media: ["Blood agar (BAP)", "MacConkey (MCA)", "Chromogenic agar for CRAB screening"],
        condition: "35–42°C, aerobic; survives on dry surfaces for weeks",
        importance: "critical",
        notes: "⚠️ Gram stain can look like GPC — can mimic S. aureus or Neisseria. CRAB is WHO critical priority. Treatment options very limited for MDR: colistin/polymyxin B, tigecycline, cefiderocol. Infection control is key.",
    },

    // ══════════════════════════════════════════════════════
    // GROUP 7: GN COCCOBACILLI / FASTIDIOUS
    // ══════════════════════════════════════════════════════
    {
        id: "h_influenzae", group: "gn_coccobacilli", groupLabel: "GN Coccobacilli", groupColor: "#a3e635",
        name: "Haemophilus influenzae", thai: "ฮีโมฟิลัส อินฟลูเอนซี",
        gram: "−", morphology: "Coccobacilli (pleomorphic)", arrangement: "Single",
        tags: ["X+V factor", "meningitis", "satellitism", "Hib vaccine", "chocolate agar"],
        clinicalInfo: {
            naturalHabitat: "Normal upper respiratory tract flora (nontypeable strains); humans only",
            diseases: ["Meningitis (type b — Hib) — was #1 cause of pediatric bacterial meningitis before vaccine", "Epiglottitis (life-threatening)", "Pneumonia", "Acute otitis media and sinusitis (nontypeable)", "Bacteremia"],
            transmission: "Respiratory droplets; nasopharyngeal carriage → invasion",
            notableFactors: "Polysaccharide capsule type b (PRP) — antiphagocytic; IgA protease; Type b = most invasive; nontypeable = mucosal infections; IgA protease",
        },
        colony: { ChocAgar: "Tiny (1 mm), grey, dewdrop, translucent after 24h; requires CO₂", BAP: "DOES NOT GROW unless next to S. aureus (satellitism)" },
        gram_stain: "Small GN pleomorphic coccobacilli (0.3 × 0.5–2 µm); highly pleomorphic from short rods to long filaments",
        key_biochem: [
            { test: "X factor (hemin)", result: "Required", note: "For respiratory enzymes (catalase, cytochrome)" },
            { test: "V factor (NAD)", result: "Required", note: "Electron carrier" },
            { test: "Satellitism (S. aureus)", result: "+", note: "Grows near S. aureus colony on BAP" },
            { test: "Oxidase", result: "+", note: "" },
            { test: "Urease", result: "+", note: "" },
            { test: "Indole", result: "−", note: "" },
            { test: "Hemolysis", result: "−", note: "" },
        ],
        media: ["Chocolate agar (essential — both X and V available after heating)", "Blood agar + S. aureus streak (satellitism)", "Fildes agar"],
        condition: "35–37°C, 5% CO₂ essential, 18–24h; sensitive to drying",
        importance: "critical",
        notes: "Hib vaccine (PRP-conjugate) has virtually eliminated Hib meningitis in vaccinated populations. Nontypeable H. influenzae still causes otitis media. BOTH X and V factors required — key ID. Treat meningitis with cefotaxime/ceftriaxone.",
    },
    {
        id: "n_gonorrhoeae", group: "gn_coccobacilli", groupLabel: "GN Coccobacilli", groupColor: "#a3e635",
        name: "Neisseria gonorrhoeae", thai: "ไนซีเรีย กอนอร์เรีย",
        gram: "−", morphology: "Diplococci (kidney bean/coffee bean shape)", arrangement: "Pairs (diplococci)",
        tags: ["gonorrhea", "STI", "intracellular PMN", "CTA glucose+", "Thayer-Martin"],
        clinicalInfo: {
            naturalHabitat: "Human urogenital tract; rectum, pharynx (in carriers)",
            diseases: ["Urethritis (men): purulent discharge, dysuria", "Cervicitis (women): often asymptomatic → PID, tubo-ovarian abscess, ectopic pregnancy", "Pelvic inflammatory disease (PID)", "Disseminated gonococcal infection (DGI): septic arthritis, tenosynovitis, skin lesions", "Neonatal conjunctivitis (ophthalmia neonatorum)", "Pharyngitis, proctitis"],
            transmission: "Sexual contact; vertical (mother → neonate during birth)",
            notableFactors: "Pili (attachment); Opa proteins; IgA protease; Antigenic variation of pilin (immune evasion); ESBL and fluoroquinolone resistance increasing",
        },
        colony: { ThayerMartin: "Small (0.5–1 mm), grey-white, opaque, glistening (24–48h)", ChocAgar: "Small, grey-white; needs CO₂" },
        gram_stain: "GN diplococci (kidney/coffee bean shape); typically INTRACELLULAR in PMN (diagnostic for gonococcal urethritis in men); 0.6–1 µm",
        key_biochem: [
            { test: "Oxidase", result: "+", note: "" },
            { test: "Catalase", result: "+", note: "" },
            { test: "Growth on Chocolate agar (CA)", result: "+", note: "" },
            { test: "Growth on Nutrient agar (Nu)", result: "−", note: "KEY — fastidious" },
            { test: "CTA Glucose", result: "+", note: "Acid production" },
            { test: "CTA Maltose", result: "−", note: "KEY vs N. meningitidis (maltose +)" },
            { test: "CTA Lactose", result: "−", note: "" },
            { test: "CTA Sucrose", result: "−", note: "" },
            { test: "CTA Fructose", result: "−", note: "" },
            { test: "Nitrate reduction", result: "−", note: "" },
            { test: "DNase", result: "−", note: "" },
            { test: "Growth at 22°C", result: "−", note: "Fastidious" },
            { test: "Growth on MacConkey", result: "−", note: "" },
        ],
        media: ["Thayer-Martin agar (VCN — selective)", "Chocolate agar + 5% CO₂", "Modified NYC medium", "Transport: Amies charcoal or Stuart's medium"],
        condition: "35–37°C, 5% CO₂ essential, 24–48h; extremely sensitive to cold, drying, and oxygen",
        importance: "critical",
        notes: "REPORTABLE STI. Intracellular GN diplococci in PMN on Gram stain = presumptive gonorrhea. CTA-maltose − differentiates from N. meningitidis. NAAT (PCR) now preferred for diagnosis. Ceftriaxone is treatment of choice; fluoroquinolone resistance widespread.",
    },
    {
        id: "n_meningitidis", group: "gn_coccobacilli", groupLabel: "GN Coccobacilli", groupColor: "#a3e635",
        name: "Neisseria meningitidis", thai: "ไนซีเรีย เมนิงไจทิดิส",
        gram: "−", morphology: "Diplococci", arrangement: "Pairs (diplococci)",
        tags: ["meningitis", "meningococcemia", "CTA glucose+maltose+", "petechiae", "vaccine"],
        clinicalInfo: {
            naturalHabitat: "Nasopharynx of humans (~10% asymptomatic carriers)",
            diseases: ["Bacterial meningitis (most common cause in adolescents/young adults)", "Meningococcemia: bacteremia with petechiae/purpura (non-blanching rash)", "Waterhouse-Friderichsen syndrome: bilateral adrenal hemorrhage, fulminant sepsis", "Purulent pericarditis", "Arthritis"],
            transmission: "Respiratory droplets; close contact (dormitories, military)",
            notableFactors: "Polysaccharide capsule (serogroups A, B, C, W, Y, X); LOS (lipooligosaccharide) endotoxin; IgA protease; Fimbriae",
        },
        colony: { ChocAgar: "Small-medium (1–2 mm), grey, smooth, β-hemolytic on horse blood", BAP: "Non-hemolytic or slightly hemolytic" },
        gram_stain: "GN diplococci, often intracellular in CSF; 0.6–1.5 µm",
        key_biochem: [
            { test: "Oxidase", result: "+", note: "" },
            { test: "Catalase", result: "+", note: "" },
            { test: "Growth on Chocolate agar (CA)", result: "+", note: "" },
            { test: "Growth on Nutrient agar (Nu)", result: "+", note: "" },
            { test: "CTA Glucose", result: "+", note: "" },
            { test: "CTA Maltose", result: "+", note: "KEY vs N. gonorrhoeae (maltose −)" },
            { test: "CTA Lactose", result: "−", note: "" },
            { test: "CTA Sucrose", result: "−", note: "" },
            { test: "CTA Fructose", result: "−", note: "" },
            { test: "Nitrate reduction", result: "−", note: "vs N. mucosa = +" },
            { test: "DNase", result: "−", note: "" },
        ],
        media: ["Chocolate agar + 5% CO₂", "Blood agar + CO₂", "Thayer-Martin (less selective than for GC)"],
        condition: "35–37°C, 5% CO₂, 24–48h; process CSF IMMEDIATELY; never refrigerate",
        importance: "critical",
        notes: "MEDICAL EMERGENCY. CSF: turbid, GN diplococci intracellular/extracellular + low glucose + high protein. Penicillin G (if sensitive) or ceftriaxone. Rifampicin/ciprofloxacin chemoprophylaxis for close contacts. MenACWY and MenB vaccines available.",
    },

    // ══════════════════════════════════════════════════════
    // NEW: ENTEROBACTERALES
    // ══════════════════════════════════════════════════════
    {
        id: "shigella_sonnei", group: "enterobacterales", groupLabel: "Enterobacterales", groupColor: "#f87171",
        name: "Shigella sonnei", thai: "ชิเกลลา ซอนเนอิ",
        gram: "−", morphology: "Rods", arrangement: "Single",
        tags: ["dysentery", "NLF", "non-motile", "OD+", "serogroup D"],
        clinicalInfo: {
            naturalHabitat: "Human GI tract only; no animal reservoir",
            diseases: ["Shigellosis (bacillary dysentery): bloody mucoid diarrhea with tenesmus", "Most common Shigella in developed countries", "Milder than S. dysenteriae"],
            transmission: "Fecal-oral; very low infectious dose (~10–200 organisms); contaminated food/water",
            notableFactors: "Intracellular colonic epithelial cell pathogen; acid-resistant; very low ID₅₀",
        },
        colony: { BAP: "Grey, 2mm, γ-hemolysis", MCA: "NLF (colorless)", XLD: "Red/pink (NLF)", TCBS: "No growth", SS: "Colorless, no black center" },
        gram_stain: "GNB; non-capsulated, non-motile",
        key_biochem: [
            { test: "Oxidase", result: "−", note: "" },
            { test: "TSI", result: "K/A", note: "NO gas, NO H₂S" },
            { test: "Indole", result: "−", note: "" },
            { test: "MR", result: "+", note: "" },
            { test: "VP", result: "−", note: "" },
            { test: "Citrate", result: "−", note: "" },
            { test: "Urease", result: "−", note: "" },
            { test: "Motile", result: "−", note: "KEY — all Shigella non-motile" },
            { test: "LD (Lysine)", result: "−", note: "" },
            { test: "OD (Ornithine)", result: "+", note: "KEY — Serogroup D only" },
            { test: "PD", result: "−", note: "" },
            { test: "Malonate", result: "−", note: "" },
            { test: "Gas from glucose", result: "−", note: "" },
            { test: "H₂S", result: "−", note: "" },
            { test: "Mannitol", result: "+", note: "vs S. dysenteriae = −" },
            { test: "Arabinose", result: "+", note: "" },
        ],
        media: ["MacConkey", "SS agar", "XLD", "Selenite F broth (enrichment)"],
        condition: "35–37°C, aerobic",
        importance: "high",
        notes: "Serogroup D. OD+ is KEY differentiator from other Shigella. Late lactose fermenter possible. Treat: azithromycin or fluoroquinolone.",
    },
    {
        id: "shigella_dysenteriae", group: "enterobacterales", groupLabel: "Enterobacterales", groupColor: "#f87171",
        name: "Shigella dysenteriae", thai: "ชิเกลลา ดิสเซนทีรี",
        gram: "−", morphology: "Rods", arrangement: "Single",
        tags: ["Shiga toxin", "HUS", "serogroup A", "mannitol−", "dysentery"],
        clinicalInfo: {
            naturalHabitat: "Human GI tract; outbreaks in developing countries",
            diseases: ["Severe bloody dysentery", "HUS (type 1 — Shiga toxin producer)", "Toxic megacolon"],
            transmission: "Fecal-oral; very low infectious dose",
            notableFactors: "Shiga toxin (Stx1) — cytotoxic to colonic epithelium and renal endothelium",
        },
        colony: { BAP: "Grey, γ-hemolysis", MCA: "NLF", XLD: "Red/pink (NLF)", SS: "Colorless", TCBS: "No growth" },
        gram_stain: "GNB, non-motile",
        key_biochem: [
            { test: "Oxidase", result: "−", note: "" },
            { test: "TSI", result: "K/A", note: "No gas, no H₂S" },
            { test: "Indole", result: "+/−", note: "Variable by serotype" },
            { test: "MR", result: "+", note: "" },
            { test: "VP", result: "−", note: "" },
            { test: "Citrate", result: "−", note: "" },
            { test: "Urease", result: "−", note: "" },
            { test: "Motile", result: "−", note: "KEY" },
            { test: "LD", result: "−", note: "" },
            { test: "OD", result: "−", note: "vs S. sonnei = +" },
            { test: "PD", result: "−", note: "" },
            { test: "Malonate", result: "−", note: "" },
            { test: "Gas from glucose", result: "−", note: "" },
            { test: "H₂S", result: "−", note: "" },
            { test: "Mannitol", result: "−", note: "KEY — serogroup A mannitol negative!" },
            { test: "Arabinose", result: "−", note: "" },
        ],
        media: ["MacConkey", "SS agar", "XLD", "Selenite F"],
        condition: "35–37°C, aerobic",
        importance: "high",
        notes: "Serogroup A. Mannitol− is KEY. Shiga toxin causes HUS. Most severe dysentery of all Shigella species.",
    },
    {
        id: "serratia_marcescens", group: "enterobacterales", groupLabel: "Enterobacterales", groupColor: "#f87171",
        name: "Serratia marcescens", thai: "เซอราเชีย มาร์เซสเซนส์",
        gram: "−", morphology: "Rods", arrangement: "Single",
        tags: ["pink-red pigment", "DNase+", "arabinose−", "NLF", "nosocomial"],
        clinicalInfo: {
            naturalHabitat: "Soil, water, GI tract; hospital environment (sinks, ventilators)",
            diseases: ["UTI (catheter-associated)", "Pneumonia (HAP/VAP)", "Bacteremia", "Wound infections", "Endocarditis (IV drug users)"],
            transmission: "Nosocomial; contaminated hands, IV equipment",
            notableFactors: "Prodigiosin (red pigment at RT); DNase; lipases; AmpC β-lactamase",
        },
        colony: { BAP: "Grey-white → PINK-RED pigment at RT (not 37°C), γ-hemolysis, 2–5mm", MCA: "NLF (colorless)", XLD: "Red/pink (NLF)", TCBS: "No growth", special: "Incubate at RT (22–25°C) after initial 37°C to see pigment" },
        gram_stain: "GNB",
        key_biochem: [
            { test: "Oxidase", result: "−", note: "" },
            { test: "TSI", result: "A/A or A/AG", note: "Gas variable" },
            { test: "Indole", result: "−", note: "" },
            { test: "MR", result: "−", note: "" },
            { test: "VP", result: "+", note: "" },
            { test: "Citrate", result: "+", note: "" },
            { test: "Urease", result: "−", note: "" },
            { test: "Motile", result: "+", note: "" },
            { test: "LD (Lysine)", result: "+", note: "" },
            { test: "OD (Ornithine)", result: "+", note: "" },
            { test: "PD", result: "−", note: "" },
            { test: "Malonate", result: "−", note: "" },
            { test: "Gas from glucose", result: "± (little)", note: "" },
            { test: "H₂S", result: "−", note: "" },
            { test: "Mannitol", result: "+", note: "" },
            { test: "Arabinose", result: "−", note: "KEY vs Enterobacter (+)" },
            { test: "DNase", result: "+", note: "KEY vs Enterobacter (−)" },
            { test: "Pigment at RT", result: "pink-red", note: "NOT at 37°C" },
        ],
        media: ["Blood agar (BAP)", "MacConkey"],
        condition: "35–37°C; check pigment at RT",
        importance: "moderate",
        notes: "Arabinose− + DNase+ = Serratia. Pink pigment at RT is classic but absent in some strains. AmpC-producing — treat with carbapenems. Check pigment at room temperature after 37°C incubation.",
    },
    {
        id: "enterobacter_cloacae", group: "enterobacterales", groupLabel: "Enterobacterales", groupColor: "#f87171",
        name: "Enterobacter cloacae", thai: "เอนเทอโรแบคเตอร์ โคลาซี",
        gram: "−", morphology: "Rods", arrangement: "Single",
        tags: ["ESKAPE", "AmpC", "LF", "OD+ LD−", "nosocomial"],
        clinicalInfo: {
            naturalHabitat: "GI tract, soil, water; hospital environments",
            diseases: ["UTI (nosocomial)", "Wound infections", "Bacteremia", "Pneumonia"],
            transmission: "Nosocomial; endogenous",
            notableFactors: "Inducible AmpC β-lactamase (SPACE organisms); ESBL production; can develop resistance during therapy",
        },
        colony: { BAP: "Grey, 2–3mm, γ-hemolysis", MCA: "LF (pink)", XLD: "Yellow (LF on XLD)", TCBS: "No growth" },
        gram_stain: "GNB",
        key_biochem: [
            { test: "Oxidase", result: "−", note: "" },
            { test: "TSI", result: "A/AG", note: "" },
            { test: "Indole", result: "−", note: "" },
            { test: "MR", result: "−", note: "" },
            { test: "VP", result: "+", note: "" },
            { test: "Citrate", result: "+", note: "" },
            { test: "Urease", result: "+", note: "" },
            { test: "Motile", result: "+", note: "" },
            { test: "LD (Lysine)", result: "−", note: "vs E. aerogenes (LD+)" },
            { test: "OD (Ornithine)", result: "+", note: "KEY vs Klebsiella (OD−)" },
            { test: "PD", result: "−", note: "" },
            { test: "Malonate", result: "+", note: "" },
            { test: "Gas from glucose", result: "+", note: "" },
            { test: "Mannitol", result: "+", note: "" },
            { test: "Arabinose", result: "+", note: "KEY vs Serratia (arabinose−)" },
            { test: "DNase", result: "−", note: "KEY vs Serratia (DNase+)" },
        ],
        media: ["Blood agar", "MacConkey"],
        condition: "35–37°C, aerobic",
        importance: "moderate",
        notes: "OD+ LD− differentiates from other Enterobacter. SPACE organisms have inducible AmpC — 3rd gen cephalosporin resistance may emerge during therapy. Treat severe infections with carbapenems.",
    },
    {
        id: "morganella_morganii", group: "enterobacterales", groupLabel: "Enterobacterales", groupColor: "#f87171",
        name: "Morganella morganii", thai: "มอร์กาเนลลา มอร์กาเนีย",
        gram: "−", morphology: "Rods", arrangement: "Single",
        tags: ["PD+", "urease+", "OD+", "NLF", "K/AG TSI"],
        clinicalInfo: {
            naturalHabitat: "GI tract of humans and animals; environment",
            diseases: ["UTI (nosocomial)", "Wound infections", "Bacteremia"],
            transmission: "Endogenous; nosocomial",
            notableFactors: "Urease; PD (phenylalanine deaminase); AmpC β-lactamase; intrinsic resistance to ampicillin",
        },
        colony: { BAP: "Grey, 2–3mm, γ-hemolysis", MCA: "NLF (colorless)", XLD: "Red/pink", TCBS: "No growth" },
        gram_stain: "GNB",
        key_biochem: [
            { test: "Oxidase", result: "−", note: "" },
            { test: "TSI", result: "K/AG", note: "Alkaline slant, acid butt + gas" },
            { test: "Indole", result: "+", note: "" },
            { test: "MR", result: "+", note: "" },
            { test: "VP", result: "−", note: "" },
            { test: "Citrate", result: "−", note: "" },
            { test: "Urease", result: "+", note: "" },
            { test: "Motile", result: "+", note: "" },
            { test: "LD", result: "−", note: "" },
            { test: "OD", result: "+", note: "" },
            { test: "PD (Phenylalanine)", result: "+", note: "KEY — PD group" },
            { test: "Malonate", result: "−", note: "" },
            { test: "Gas from glucose", result: "+", note: "" },
            { test: "H₂S", result: "−", note: "vs Proteus = +" },
            { test: "Mannitol", result: "−", note: "" },
            { test: "Arabinose", result: "−", note: "" },
        ],
        media: ["Blood agar", "MacConkey"],
        condition: "35–37°C",
        importance: "low",
        notes: "PD+ (with Proteus/Providencia). No H₂S (vs Proteus mirabilis). TSI K/AG (vs Proteus = K/AG H₂S). Intrinsic ampicillin resistance.",
    },
    {
        id: "citrobacter_freundii", group: "enterobacterales", groupLabel: "Enterobacterales", groupColor: "#f87171",
        name: "Citrobacter freundii", thai: "ซิโตรแบคเตอร์ ฟรุนดิ",
        gram: "−", morphology: "Rods", arrangement: "Single",
        tags: ["H2S+", "mimics Salmonella", "LD−", "neonatal meningitis"],
        clinicalInfo: {
            naturalHabitat: "GI tract, environment; hospital",
            diseases: ["UTI (nosocomial)", "Neonatal meningitis with brain abscess (C. koseri)", "Bacteremia", "Wound infections"],
            transmission: "Endogenous; nosocomial",
            notableFactors: "AmpC β-lactamase; H₂S production mimics Salmonella on SS agar",
        },
        colony: { BAP: "Grey, γ-hemolysis", MCA: "NLF or variable LF", XLD: "Red with/without black center", SS: "NLF with black center (mimics Salmonella!)", TCBS: "No growth" },
        gram_stain: "GNB",
        key_biochem: [
            { test: "Oxidase", result: "−", note: "" },
            { test: "TSI", result: "A/AG H₂S or K/AG H₂S", note: "H₂S production" },
            { test: "Indole", result: "−", note: "" },
            { test: "MR", result: "+", note: "" },
            { test: "VP", result: "−", note: "" },
            { test: "Citrate", result: "+", note: "" },
            { test: "Urease", result: "+/−", note: "Variable" },
            { test: "Motile", result: "+", note: "" },
            { test: "LD", result: "−", note: "KEY vs Salmonella (LD+)" },
            { test: "OD", result: "−", note: "KEY vs Salmonella (OD+)" },
            { test: "PD", result: "−", note: "" },
            { test: "Malonate", result: "−", note: "" },
            { test: "Gas from glucose", result: "+", note: "" },
            { test: "H₂S", result: "+", note: "Mimics Salmonella on SS agar!" },
            { test: "Mannitol", result: "+", note: "" },
            { test: "Arabinose", result: "+", note: "" },
        ],
        media: ["MacConkey", "SS agar", "XLD"],
        condition: "35–37°C",
        importance: "moderate",
        notes: "⚠️ Can mimic Salmonella on SS agar (NLF + black center)! Differentiate by LD− OD− (vs Salmonella LD+ OD+). C. koseri (diversus): indole+, no H₂S — causes neonatal brain abscess.",
    },
    {
        id: "edwardsiella_tarda", group: "enterobacterales", groupLabel: "Enterobacterales", groupColor: "#f87171",
        name: "Edwardsiella tarda", thai: "เอ็ดวาร์เซียลลา ทาร์ดา",
        gram: "−", morphology: "Rods", arrangement: "Single",
        tags: ["H2S+++", "mannitol−", "indole+", "fish", "K/AG H2S"],
        clinicalInfo: {
            naturalHabitat: "Freshwater fish, reptiles, amphibians",
            diseases: ["Gastroenteritis after fish ingestion", "Wound infections (fish/reptile contact)", "Bacteremia in immunocompromised"],
            transmission: "Contaminated fish/water; wound contact",
            notableFactors: "Heavy H₂S production; intracellular survival",
        },
        colony: { BAP: "Grey, γ-hemolysis, 1–2mm", MCA: "NLF", XLD: "Black (heavy H₂S)", SS: "Black center", TCBS: "No growth" },
        gram_stain: "GNB",
        key_biochem: [
            { test: "Oxidase", result: "−", note: "" },
            { test: "TSI", result: "K/AG H₂S 3+", note: "Heavy H₂S" },
            { test: "Indole", result: "+", note: "" },
            { test: "MR", result: "+", note: "" },
            { test: "VP", result: "−", note: "" },
            { test: "Citrate", result: "−", note: "" },
            { test: "Urease", result: "−", note: "" },
            { test: "Motile", result: "+", note: "" },
            { test: "LD", result: "+", note: "" },
            { test: "OD", result: "+", note: "" },
            { test: "PD", result: "−", note: "" },
            { test: "Malonate", result: "−", note: "" },
            { test: "Gas from glucose", result: "+", note: "" },
            { test: "H₂S", result: "+++ (heavy)", note: "" },
            { test: "Mannitol", result: "−", note: "KEY — unique among H₂S producers!" },
            { test: "Arabinose", result: "−", note: "" },
        ],
        media: ["MacConkey", "SS agar", "XLD"],
        condition: "35–37°C",
        importance: "low",
        notes: "Mannitol− is KEY vs Salmonella (mannitol+). Heavy H₂S + indole+ + mannitol− = E. tarda. Rare — usually fish/reptile exposure.",
    },
    {
        id: "plesiomonas_shigelloides", group: "enterobacterales", groupLabel: "Enterobacterales", groupColor: "#f87171",
        name: "Plesiomonas shigelloides", thai: "เพลซิโอโมแนส ชิเกลลอยเดส",
        gram: "−", morphology: "Rods", arrangement: "Single",
        tags: ["oxidase+ exception", "LD/OD/AD+++", "TCBS no growth", "seafood", "freshwater"],
        clinicalInfo: {
            naturalHabitat: "Freshwater; GI tract of fish, frogs; tropical regions",
            diseases: ["Acute watery/bloody diarrhea after contaminated water/seafood", "Extraintestinal: bacteremia, meningitis (immunocompromised)"],
            transmission: "Contaminated water; raw seafood",
            notableFactors: "Oxidase+ (unique for Enterobacterales); all three decarboxylases positive; no TCBS growth",
        },
        colony: { BAP: "Grey, γ-hemolysis", MCA: "NLF (colorless/pink, variable)", XLD: "Red/pink (NLF, no H₂S)", TCBS: "No growth (key vs Vibrio!)" },
        gram_stain: "GNB, peritrichous flagella",
        key_biochem: [
            { test: "Oxidase", result: "+", note: "⚠️ EXCEPTION in Enterobacterales!" },
            { test: "TSI", result: "A/A", note: "No gas, no H₂S" },
            { test: "Indole", result: "+", note: "" },
            { test: "MR", result: "+", note: "" },
            { test: "VP", result: "−", note: "" },
            { test: "Citrate", result: "−", note: "" },
            { test: "Urease", result: "−", note: "" },
            { test: "Motile", result: "+", note: "" },
            { test: "LD (Lysine)", result: "+", note: "" },
            { test: "OD (Ornithine)", result: "+", note: "" },
            { test: "AD (Arginine)", result: "+", note: "Unique: LD/OD/AD all +" },
            { test: "PD", result: "−", note: "" },
            { test: "Malonate", result: "−", note: "" },
            { test: "Gas from glucose", result: "−", note: "" },
            { test: "H₂S", result: "−", note: "" },
            { test: "Mannitol", result: "−", note: "" },
            { test: "TCBS growth", result: "−", note: "KEY vs Vibrio/Aeromonas" },
            { test: "Inositol", result: "+", note: "" },
        ],
        media: ["Blood agar", "MacConkey", "IBGB agar"],
        condition: "35–37°C",
        importance: "moderate",
        notes: "Only oxidase+ Enterobacterales. LD/OD/AD all + is unique. No TCBS growth differentiates from Vibrio/Aeromonas. Treat with fluoroquinolones.",
    },

    // ══════════════════════════════════════════════════════
    // VIBRIONACEAE — ADDITIONAL
    // ══════════════════════════════════════════════════════
    {
        id: "v_mimicus", group: "vibrio", groupLabel: "Vibrionaceae", groupColor: "#38bdf8",
        name: "Vibrio mimicus", thai: "วิบริโอ มิมิคัส",
        gram: "−", morphology: "Curved rods", arrangement: "Single",
        tags: ["TCBS green", "0%NaCl+", "mimics V.cholerae", "sucrose−"],
        clinicalInfo: {
            naturalHabitat: "Estuarine/coastal water; oysters, shrimp",
            diseases: ["Gastroenteritis after raw seafood", "Otitis media", "Wound infection"],
            transmission: "Raw seafood; saltwater",
            notableFactors: "Similar to V. cholerae biochemically but O1/O139 negative",
        },
        colony: { TCBS: "GREEN (sucrose negative) — vs V. cholerae = yellow", BAP: "β-hemolysis (some strains)", MCA: "NLF" },
        gram_stain: "GN curved rods",
        key_biochem: [
            { test: "Oxidase", result: "+", note: "" },
            { test: "TCBS colony", result: "Green (sucrose−)", note: "vs V. cholerae = yellow" },
            { test: "TSI", result: "K/A", note: "No gas" },
            { test: "Sucrose", result: "−", note: "" },
            { test: "Gas from glucose", result: "−", note: "" },
            { test: "0% NaCl growth", result: "+", note: "Like V. cholerae" },
            { test: "1% NaCl growth", result: "+", note: "" },
            { test: "6% NaCl growth", result: "±", note: "" },
            { test: "8% NaCl growth", result: "−", note: "" },
            { test: "10% NaCl growth", result: "−", note: "" },
            { test: "LD (1%NaCl)", result: "+", note: "" },
            { test: "OD (1%NaCl)", result: "+", note: "" },
            { test: "AD (1%NaCl)", result: "−", note: "" },
            { test: "VP (1%NaCl)", result: "−", note: "" },
            { test: "Mannitol", result: "+", note: "" },
            { test: "Lactose", result: "−", note: "" },
            { test: "Arabinose", result: "−", note: "" },
            { test: "Sorbitol", result: "−", note: "" },
            { test: "Inositol", result: "+", note: "" },
            { test: "O1/O139 agglutination", result: "−", note: "vs V. cholerae = +" },
        ],
        media: ["TCBS", "Blood agar + NaCl", "Alkaline peptone water"],
        condition: "35–37°C",
        importance: "low",
        notes: "Green TCBS + 0% NaCl growth + O1/O139 negative = V. mimicus. Less pathogenic than V. cholerae. Can mimic V. cholerae biochemically.",
    },
    {
        id: "aeromonas_sorbia", group: "vibrio", groupLabel: "Vibrionaceae", groupColor: "#38bdf8",
        name: "Aeromonas sorbia", thai: "แอโรโมแนส ซอร์เบีย",
        gram: "−", morphology: "Rods", arrangement: "Single",
        tags: ["TCBS no growth", "A/AG", "arabinose−", "salicin−", "esculin−"],
        clinicalInfo: {
            naturalHabitat: "Freshwater, soil; GI tract of fish",
            diseases: ["Gastroenteritis", "Wound infection (freshwater)"],
            transmission: "Freshwater; wounds",
            notableFactors: "Less biochemically reactive than A. hydrophila",
        },
        colony: { BAP: "Grey, β-hemolysis", MCA: "NLF", TCBS: "No growth (Aeromonas ≠ Vibrio)", XLD: "Red (NLF)" },
        gram_stain: "GNB",
        key_biochem: [
            { test: "Oxidase", result: "+", note: "" },
            { test: "TCBS growth", result: "−", note: "Aeromonas ≠ Vibrio" },
            { test: "TSI", result: "A/AG", note: "Gas produced" },
            { test: "Sucrose", result: "+", note: "" },
            { test: "Gas from glucose", result: "+", note: "" },
            { test: "0% NaCl growth", result: "+", note: "Grows without NaCl" },
            { test: "1% NaCl growth", result: "+", note: "" },
            { test: "6% NaCl growth", result: "−", note: "" },
            { test: "8% NaCl growth", result: "−", note: "" },
            { test: "10% NaCl growth", result: "−", note: "" },
            { test: "LD (1%NaCl)", result: "+", note: "" },
            { test: "OD (1%NaCl)", result: "−", note: "" },
            { test: "AD (1%NaCl)", result: "−", note: "" },
            { test: "VP (1%NaCl)", result: "±", note: "" },
            { test: "Mannitol", result: "+", note: "" },
            { test: "Lactose", result: "+", note: "" },
            { test: "Arabinose", result: "−", note: "KEY vs A. hydrophila (+)" },
            { test: "Sorbitol", result: "−", note: "" },
            { test: "Inositol", result: "−", note: "" },
            { test: "Esculin", result: "−", note: "KEY vs A. hydrophila (+)" },
            { test: "Salicin", result: "−", note: "KEY vs A. hydrophila (+)" },
        ],
        media: ["Blood agar", "MacConkey"],
        condition: "25–37°C",
        importance: "low",
        notes: "Arabinose−/Esculin−/Salicin− all = A. sorbia (vs A. hydrophila all +). Gas in TSI (A/AG) vs A. caviae (A/A). No TCBS growth = Aeromonas, not Vibrio.",
    },

    // ══════════════════════════════════════════════════════
    // NFB — ADDITIONAL
    // ══════════════════════════════════════════════════════
    {
        id: "p_fluorescens", group: "nfb", groupLabel: "NFB", groupColor: "#22d3ee",
        name: "Pseudomonas fluorescens", thai: "ซูโดโมแนส ฟลูออเรสเซนส์",
        gram: "−", morphology: "Rods", arrangement: "Single",
        tags: ["King F+", "UV fluorescent", "no 42°C", "gelatin+", "psychrotrophic"],
        clinicalInfo: {
            naturalHabitat: "Soil, water, refrigerated food; grows at 4°C",
            diseases: ["Rare nosocomial (immunocompromised)", "Transfusion reactions from contaminated blood products"],
            transmission: "Environmental; contaminated refrigerated blood products",
            notableFactors: "Psychrotrophic (grows at 4°C); pyoverdin pigment; gelatin liquefaction",
        },
        colony: { BAP: "Grey-white, fluorescent yellow-green under UV (365nm)", MCA: "NLF (grows)", King_B: "Yellow-green fluorescence" },
        gram_stain: "GNB",
        key_biochem: [
            { test: "Oxidase", result: "+", note: "" },
            { test: "TSI", result: "K/N", note: "" },
            { test: "Motile", result: "+", note: "" },
            { test: "Indole", result: "−", note: "" },
            { test: "King P (pyocyanin)", result: "−", note: "No blue-green" },
            { test: "King F (fluorescein)", result: "+", note: "Yellow-green UV fluorescent" },
            { test: "Urease", result: "−", note: "" },
            { test: "Nitrate reduction", result: "−", note: "KEY vs P. aeruginosa (+)" },
            { test: "N₂ gas from NO₃", result: "−", note: "" },
            { test: "Growth at 42°C", result: "−", note: "KEY vs P. aeruginosa (+)" },
            { test: "Esculin", result: "−", note: "" },
            { test: "DNase", result: "−", note: "" },
            { test: "Gelatin", result: "+", note: "KEY vs P. putida (−)" },
            { test: "Starch", result: "−", note: "" },
            { test: "6.5% NaCl", result: "+", note: "" },
            { test: "Glucose O/F", result: "O (oxidative)", note: "" },
            { test: "Xylose", result: "+", note: "" },
            { test: "Mannitol", result: "+/−", note: "" },
            { test: "Lactose", result: "−", note: "" },
            { test: "Maltose", result: "−", note: "" },
            { test: "Sucrose", result: "−", note: "" },
        ],
        media: ["Blood agar", "MacConkey", "King B agar"],
        condition: "25–30°C optimal; NO 42°C growth; grows at 4°C",
        importance: "low",
        notes: "King F+ (fluorescein) but no pyocyanin. No growth at 42°C (vs P. aeruginosa +). Gelatin+ (vs P. putida −). Risk for blood product contamination at 4°C.",
    },
    {
        id: "p_putida", group: "nfb", groupLabel: "NFB", groupColor: "#22d3ee",
        name: "Pseudomonas putida", thai: "ซูโดโมแนส พูทิดา",
        gram: "−", morphology: "Rods", arrangement: "Single",
        tags: ["King F+", "gelatin−", "no 42°C", "fluorescent"],
        clinicalInfo: {
            naturalHabitat: "Soil, water, rhizosphere",
            diseases: ["Rarely: UTI, bacteremia (immunocompromised)"],
            transmission: "Environmental",
            notableFactors: "Fluorescent pigment; non-pathogenic usually",
        },
        colony: { BAP: "Grey-white, yellow-green fluorescence under UV", MCA: "NLF" },
        gram_stain: "GNB",
        key_biochem: [
            { test: "Oxidase", result: "+", note: "" },
            { test: "TSI", result: "K/N", note: "" },
            { test: "Motile", result: "+", note: "" },
            { test: "Indole", result: "−", note: "" },
            { test: "King P", result: "−", note: "" },
            { test: "King F", result: "+", note: "Same as P. fluorescens" },
            { test: "Urease", result: "−", note: "" },
            { test: "Nitrate reduction", result: "−", note: "" },
            { test: "N₂ gas from NO₃", result: "−", note: "" },
            { test: "Growth at 42°C", result: "−", note: "" },
            { test: "Esculin", result: "−", note: "" },
            { test: "DNase", result: "−", note: "" },
            { test: "Gelatin", result: "−", note: "KEY vs P. fluorescens (+)" },
            { test: "Starch", result: "−", note: "" },
            { test: "6.5% NaCl", result: "+", note: "" },
            { test: "Glucose O/F", result: "O (oxidative)", note: "" },
            { test: "Xylose", result: "+", note: "" },
            { test: "Mannitol", result: "+/−", note: "" },
            { test: "Lactose", result: "−", note: "" },
            { test: "Maltose", result: "−", note: "" },
            { test: "Sucrose", result: "−", note: "" },
        ],
        media: ["Blood agar", "King B agar"],
        condition: "25–37°C; no 42°C",
        importance: "low",
        notes: "Differentiated from P. fluorescens by Gelatin−. Both: King F+, no growth 42°C, no pyocyanin. Rarely clinical significance.",
    },
    {
        id: "p_stutzeri", group: "nfb", groupLabel: "NFB", groupColor: "#22d3ee",
        name: "Pseudomonas stutzeri", thai: "ซูโดโมแนส สตัทเซอรี",
        gram: "−", morphology: "Rods", arrangement: "Single",
        tags: ["wrinkled colony", "starch+", "gas NO3+", "no pigment"],
        clinicalInfo: {
            naturalHabitat: "Soil, water; nitrogen cycle denitrifier",
            diseases: ["Rare opportunistic infections"],
            transmission: "Environmental",
            notableFactors: "Denitrification (NO₃→N₂); starch hydrolysis; wrinkled colonies",
        },
        colony: { BAP: "Wrinkled/rugose, dry, adherent; tan-brown color — hard to pick with loop", MCA: "NLF" },
        gram_stain: "GNB",
        key_biochem: [
            { test: "Oxidase", result: "+", note: "" },
            { test: "TSI", result: "K/N", note: "" },
            { test: "Motile", result: "+", note: "" },
            { test: "Indole", result: "−", note: "" },
            { test: "King P", result: "−", note: "No pigment" },
            { test: "King F", result: "−", note: "No pigment" },
            { test: "Urease", result: "−", note: "" },
            { test: "Nitrate reduction", result: "+", note: "" },
            { test: "N₂ gas from NO₃", result: "+", note: "Denitrification" },
            { test: "Growth at 42°C", result: "+", note: "" },
            { test: "Esculin", result: "−", note: "" },
            { test: "DNase", result: "−", note: "" },
            { test: "Gelatin", result: "−", note: "" },
            { test: "Starch", result: "+", note: "KEY — UNIQUE among Pseudomonas!" },
            { test: "6.5% NaCl", result: "+", note: "" },
            { test: "Glucose O/F", result: "O (oxidative)", note: "" },
            { test: "Xylose", result: "+", note: "" },
            { test: "Mannitol", result: "+/−", note: "" },
            { test: "Lactose", result: "−", note: "" },
            { test: "Maltose", result: "−", note: "" },
            { test: "Sucrose", result: "−", note: "" },
        ],
        media: ["Blood agar", "MacConkey", "Starch agar"],
        condition: "25–42°C",
        importance: "low",
        notes: "Wrinkled dry colony is characteristic. Starch+ UNIQUE among Pseudomonas. Gas from NO₃+ (denitrification). King P/F both − (no pigment). Differentiates from Burkholderia by starch+.",
    },
    {
        id: "p_mendocina", group: "nfb", groupLabel: "NFB", groupColor: "#22d3ee",
        name: "Pseudomonas mendocina", thai: "ซูโดโมแนส เมนโดซินา",
        gram: "−", morphology: "Rods", arrangement: "Single",
        tags: ["King P−/F−", "starch−", "no pigment", "rare"],
        clinicalInfo: {
            naturalHabitat: "Soil, water; environmental",
            diseases: ["Rare: endocarditis, bacteremia"],
            transmission: "Environmental",
            notableFactors: "No pigment; similar to P. stutzeri but starch−",
        },
        colony: { BAP: "Grey-white, no distinctive pigment", MCA: "NLF" },
        gram_stain: "GNB",
        key_biochem: [
            { test: "Oxidase", result: "+", note: "" },
            { test: "TSI", result: "K/N", note: "" },
            { test: "Motile", result: "+", note: "" },
            { test: "Indole", result: "−", note: "" },
            { test: "King P", result: "−", note: "" },
            { test: "King F", result: "−", note: "" },
            { test: "Urease", result: "−", note: "" },
            { test: "Nitrate reduction", result: "+", note: "" },
            { test: "N₂ gas from NO₃", result: "+", note: "" },
            { test: "Growth at 42°C", result: "+", note: "" },
            { test: "Esculin", result: "−", note: "" },
            { test: "DNase", result: "−", note: "" },
            { test: "Gelatin", result: "−", note: "" },
            { test: "Starch", result: "−", note: "KEY vs P. stutzeri (+)" },
            { test: "6.5% NaCl", result: "+", note: "" },
            { test: "Glucose O/F", result: "O (oxidative)", note: "" },
            { test: "Xylose", result: "+", note: "" },
            { test: "Mannitol", result: "+/−", note: "" },
            { test: "Lactose", result: "−", note: "" },
            { test: "Maltose", result: "−", note: "" },
            { test: "Sucrose", result: "−", note: "" },
        ],
        media: ["Blood agar", "MacConkey"],
        condition: "25–42°C",
        importance: "low",
        notes: "Similar to P. stutzeri but Starch−. Both King P/F − and Gas from NO₃+. Rarely clinically significant.",
    },
    {
        id: "b_cepacia", group: "nfb", groupLabel: "NFB", groupColor: "#22d3ee",
        name: "Burkholderia cepacia complex", thai: "เบิร์คโฮลเดอเรีย ซีพาเซีย",
        gram: "−", morphology: "Rods", arrangement: "Single/pairs",
        tags: ["CF lung", "yellow pigment", "gas NO3−", "arabinose+", "BCSA"],
        clinicalInfo: {
            naturalHabitat: "Soil, water, plants; hospital environment; CF patient lungs",
            diseases: ["CF lung infections ('cepacia syndrome')", "Nosocomial pneumonia, bacteremia, UTI"],
            transmission: "Person-to-person (CF patients!); environmental; contaminated products",
            notableFactors: "Intrinsic resistance to many antibiotics; biofilm; transmissible strains; yellow pigment",
        },
        colony: { BAP: "Wrinkled/rugose; yellow pigment (variable)", MCA: "NLF (grows)", BCSA: "Selective medium for CF" },
        gram_stain: "GNB",
        key_biochem: [
            { test: "Oxidase", result: "+", note: "" },
            { test: "TSI", result: "K/N or A/A", note: "" },
            { test: "Motile", result: "+", note: "" },
            { test: "Indole", result: "−", note: "" },
            { test: "King P", result: "−", note: "" },
            { test: "King F", result: "−", note: "" },
            { test: "Urease", result: "+", note: "" },
            { test: "Nitrate reduction", result: "+/−", note: "" },
            { test: "N₂ gas from NO₃", result: "−", note: "KEY vs B. pseudomallei (+)" },
            { test: "Growth at 42°C", result: "+/−", note: "" },
            { test: "Esculin", result: "+", note: "KEY vs P. aeruginosa (−)" },
            { test: "DNase", result: "−", note: "" },
            { test: "Gelatin", result: "+/−", note: "" },
            { test: "Starch", result: "−", note: "" },
            { test: "6.5% NaCl", result: "+", note: "" },
            { test: "Glucose O/F", result: "O+/F+ (both)", note: "" },
            { test: "Xylose", result: "+", note: "" },
            { test: "Mannitol", result: "−", note: "" },
            { test: "Lactose", result: "+/−", note: "" },
            { test: "Maltose", result: "+", note: "" },
            { test: "Arabinose", result: "+", note: "vs P. stutzeri (−)" },
            { test: "Sucrose", result: "+", note: "" },
            { test: "Yellow pigment", result: "+", note: "KEY vs B. pseudomallei (−)" },
        ],
        media: ["Blood agar", "MacConkey", "BCSA (selective for CF screening)"],
        condition: "30–37°C",
        importance: "high",
        notes: "Yellow pigment+ and Gas from NO₃− differentiates from B. pseudomallei. Severe threat to CF patients. BCSA selective medium recommended. Intrinsically resistant to polymyxins. Esculin+ is key vs P. aeruginosa (Esculin−).",
    },
    {
        id: "shewanella_putrefaciens", group: "nfb", groupLabel: "NFB", groupColor: "#22d3ee",
        name: "Shewanella putrefaciens", thai: "ชิวาเนลลา พิวทริฟาเซียนส์",
        gram: "−", morphology: "Rods", arrangement: "Single",
        tags: ["H2S+ NFB", "oxidase+", "K/N H2S", "fish odor", "0%NaCl+"],
        clinicalInfo: {
            naturalHabitat: "Seawater, freshwater, food (fish spoilage); soil",
            diseases: ["Wound infection (seawater/fish)", "Bacteremia in immunocompromised", "Otitis media"],
            transmission: "Aquatic exposure; wounds",
            notableFactors: "Iron-reducing bacterium; H₂S production in TSI (unusual for NFB); fish spoilage",
        },
        colony: { BAP: "Grey-white to tan, γ-hemolysis; possible brownish pigment", MCA: "NLF" },
        gram_stain: "GNB",
        key_biochem: [
            { test: "Oxidase", result: "+", note: "" },
            { test: "TSI", result: "K/N H₂S", note: "KEY — H₂S in NFB! unusual" },
            { test: "Motile", result: "+", note: "" },
            { test: "Indole", result: "−", note: "" },
            { test: "King P", result: "−", note: "" },
            { test: "King F", result: "−", note: "" },
            { test: "Urease", result: "−", note: "" },
            { test: "Nitrate reduction", result: "+", note: "" },
            { test: "N₂ gas", result: "−", note: "" },
            { test: "Growth at 42°C", result: "+/−", note: "" },
            { test: "Esculin", result: "−", note: "" },
            { test: "DNase", result: "−", note: "" },
            { test: "Gelatin", result: "+/−", note: "" },
            { test: "Starch", result: "−", note: "" },
            { test: "6.5% NaCl", result: "−(+)", note: "Variable" },
            { test: "H₂S (TSI)", result: "+", note: "KEY — unusual for NFB!" },
            { test: "H₂S (lead acetate)", result: "+", note: "More sensitive" },
            { test: "Glucose O/F", result: "+/−", note: "S. putrefaciens oxidizes; S. alga = −" },
            { test: "Maltose", result: "+", note: "vs S. alga (−)" },
            { test: "Sucrose", result: "+", note: "vs S. alga (−)" },
            { test: "0% NaCl", result: "+", note: "Freshwater species" },
        ],
        media: ["Blood agar", "MacConkey", "TSI tube"],
        condition: "25–37°C",
        importance: "low",
        notes: "H₂S in TSI is KEY for NFB. S. alga: 6% NaCl+, glucose−, maltose−, sucrose− (marine). S. putrefaciens: 0% NaCl+ (freshwater). Both oxidase+ and H₂S+.",
    },
    {
        id: "elizabethkingia", group: "nfb", groupLabel: "NFB", groupColor: "#22d3ee",
        name: "Elizabethkingia meningosepticum", thai: "เอลิซาเบ็ธคิงเกีย เมนิงโกเซปติคัม",
        gram: "−", morphology: "Rods", arrangement: "Single/pairs",
        tags: ["indole+", "non-motile", "pale yellow", "DNase+", "neonatal meningitis"],
        clinicalInfo: {
            naturalHabitat: "Hospital environment (sinks, water); rarely soil",
            diseases: ["Neonatal meningitis (premature infants)", "Bacteremia in immunocompromised"],
            transmission: "Hospital environment; contaminated water/equipment",
            notableFactors: "Intrinsic resistance to most antibiotics incl. carbapenems; pale yellow pigment; Indole+ unusual for GNB",
        },
        colony: { BAP: "1–2mm, pale yellow pigment, smooth, opaque; slow growing", MCA: "NLF (grows)" },
        gram_stain: "GNB, short-medium rods; non-motile",
        key_biochem: [
            { test: "Oxidase", result: "+", note: "" },
            { test: "TSI", result: "K/N or +/−", note: "Weak oxidation" },
            { test: "Motile", result: "−", note: "Non-motile NFB" },
            { test: "Indole", result: "+", note: "KEY — unusual for GNB" },
            { test: "King P", result: "−", note: "" },
            { test: "King F", result: "−", note: "" },
            { test: "Urease", result: "−", note: "" },
            { test: "Nitrate reduction", result: "−", note: "" },
            { test: "N₂ gas", result: "−", note: "" },
            { test: "Growth at 42°C", result: "+/−", note: "" },
            { test: "Esculin", result: "+", note: "" },
            { test: "DNase", result: "+", note: "" },
            { test: "Gelatin", result: "+", note: "" },
            { test: "Starch", result: "−", note: "" },
            { test: "6.5% NaCl", result: "−", note: "" },
            { test: "Glucose O/F", result: "+/−", note: "" },
            { test: "Xylose", result: "−", note: "" },
            { test: "Mannitol", result: "+", note: "" },
            { test: "Lactose", result: "+", note: "" },
            { test: "Maltose", result: "+", note: "" },
            { test: "Arabinose", result: "−", note: "" },
            { test: "Sucrose", result: "−", note: "" },
            { test: "Pigment", result: "pale yellow", note: "" },
        ],
        media: ["Blood agar", "Chocolate agar", "MacConkey"],
        condition: "35–37°C; slow growth 48–72h",
        importance: "moderate",
        notes: "Oxidase+ Indole+ Non-motile = Elizabethkingia key profile. Pale yellow pigment characteristic. Intrinsically resistant to most β-lactams and carbapenems. Treatment very limited. Neonatal meningitis has high mortality.",
    },
    {
        id: "acinetobacter_lwoffii", group: "nfb", groupLabel: "NFB", groupColor: "#22d3ee",
        name: "Acinetobacter lwoffii", thai: "อาซิเนโตแบคเตอร์ ลาวฟิ",
        gram: "−", morphology: "Coccobacilli", arrangement: "Pairs/clusters",
        tags: ["oxidase−", "non-motile", "glucose−", "small colony", "skin flora"],
        clinicalInfo: {
            naturalHabitat: "Skin normal flora; environment; hospital",
            diseases: ["Rarely: bacteremia, meningitis in immunocompromised", "Usually colonizer"],
            transmission: "Skin; environment",
            notableFactors: "Less pathogenic than A. baumannii; does NOT oxidize glucose",
        },
        colony: { BAP: "Small 1–2mm, grey-white, smooth; looks like CoNS!", MCA: "NLF (may grow poorly)" },
        gram_stain: "GN coccobacilli — can look like GPC (careful!); non-motile",
        key_biochem: [
            { test: "Oxidase", result: "−", note: "" },
            { test: "TSI", result: "K/N", note: "" },
            { test: "Motile", result: "−", note: "" },
            { test: "Indole", result: "−", note: "" },
            { test: "King P", result: "−", note: "" },
            { test: "King F", result: "−", note: "" },
            { test: "Urease", result: "−", note: "" },
            { test: "Nitrate reduction", result: "−", note: "" },
            { test: "N₂ gas", result: "−", note: "" },
            { test: "Growth at 42°C", result: "+/−", note: "" },
            { test: "Esculin", result: "−", note: "" },
            { test: "DNase", result: "−", note: "" },
            { test: "Gelatin", result: "−", note: "" },
            { test: "Starch", result: "−", note: "" },
            { test: "6.5% NaCl", result: "+/−", note: "" },
            { test: "Glucose O/F", result: "−/−", note: "KEY — does NOT oxidize glucose" },
            { test: "Xylose", result: "−", note: "" },
            { test: "Mannitol", result: "−", note: "" },
            { test: "Lactose", result: "−", note: "KEY vs A. baumannii (+)" },
            { test: "Maltose", result: "−", note: "" },
            { test: "Sucrose", result: "−", note: "" },
        ],
        media: ["Blood agar", "MacConkey"],
        condition: "30–37°C",
        importance: "low",
        notes: "Glucose O/F −/− (not oxidizing glucose) KEY vs A. baumannii (+/−). Both oxidase−, non-motile coccobacilli. A. lwoffii less pathogenic. Can mimic CoNS on Gram stain — check oxidase.",
    },

    // ══════════════════════════════════════════════════════
    // GN COCCOBACILLI — MORAXELLA
    // ══════════════════════════════════════════════════════
    {
        id: "moraxella_catarrhalis", group: "gn_coccobacilli", groupLabel: "GN Coccobacilli", groupColor: "#a3e635",
        name: "Moraxella catarrhalis", thai: "โมแรกเซลลา แคทาราลิส",
        gram: "−", morphology: "Diplococci/coccobacilli", arrangement: "Pairs",
        tags: ["hockey puck", "DNase+", "COPD exacerbation", "otitis media", "β-lactamase"],
        clinicalInfo: {
            naturalHabitat: "Normal upper respiratory tract flora (especially children)",
            diseases: ["Acute otitis media (3rd most common cause)", "Sinusitis", "COPD exacerbations (adults)", "Rarely: bacteremia, meningitis, endocarditis"],
            transmission: "Respiratory droplets; endogenous",
            notableFactors: "BRO β-lactamases (90% strains); complement resistance; LOS",
        },
        colony: { BAP: "Grey-white, 1–3mm; 'hockey puck' — entire colony slides intact when pushed with loop!", MCA: "Does NOT grow", NutrientAgar: "+/− (variable)" },
        gram_stain: "GN diplococci/coccobacilli (0.6–1µm); non-motile",
        key_biochem: [
            { test: "Oxidase", result: "+", note: "" },
            { test: "Catalase", result: "+", note: "" },
            { test: "Growth on Chocolate agar (CA)", result: "+", note: "" },
            { test: "Growth on Nutrient agar (Nu)", result: "+", note: "Unlike Neisseria gonorrhoeae" },
            { test: "CTA Glucose", result: "−", note: "Does NOT ferment ANY sugar!" },
            { test: "CTA Maltose", result: "−", note: "" },
            { test: "CTA Lactose", result: "−", note: "" },
            { test: "CTA Sucrose", result: "−", note: "" },
            { test: "CTA Fructose", result: "−", note: "" },
            { test: "Nitrate reduction", result: "+", note: "vs N. gonorrhoeae (−)" },
            { test: "DNase", result: "+", note: "KEY vs Neisseria (DNase−)" },
            { test: "Butyrate esterase", result: "+", note: "Rapid test" },
            { test: "Hockey puck test", result: "+", note: "Colony slides intact when pushed" },
            { test: "Growth on MacConkey", result: "−", note: "" },
        ],
        media: ["Blood agar", "Chocolate agar"],
        condition: "35–37°C, CO₂ enhances, 24–48h",
        importance: "moderate",
        notes: "Hockey puck is classic — colony slides intact. DNase+ distinguishes from Neisseria (all sugars negative). ~90% produce β-lactamase → amoxicillin resistant. Treat with amoxicillin-clavulanate or macrolides.",
    },

    // ══════════════════════════════════════════════════════
    // GP BACILLI — MISSING Cat- NON-SPORE ORGANISMS
    // ══════════════════════════════════════════════════════
    {
        id: "erysipelothrix", group: "gpb", groupLabel: "GP Bacilli", groupColor: "#fb923c",
        name: "Erysipelothrix rhusiopathiae", thai: "เอริซิเพลโลทริก รูซิโอพาเธีย",
        gram: "+", morphology: "Short rods, some long filaments", arrangement: "Single",
        tags: ["Cat−", "H2S+ TSI", "pinpoint", "veterinary", "erysipeloid"],
        clinicalInfo: {
            naturalHabitat: "Soil, water, decaying organic matter; GI tract of pigs, fish, birds",
            diseases: ["Erysipeloid: localized skin infection (painless, dark-purple swelling) from fish/pig/poultry handling", "Endocarditis (rare, if systemic)", "Septicemia in immunocompromised"],
            transmission: "Contact with infected animals/products; wound inoculation (fish handlers, butchers)",
            notableFactors: "H₂S production in TSI (unusual for GP bacteria); intrinsically resistant to vancomycin",
        },
        colony: { BAP: "Pinpoint, γ or α hemolysis; slow growing (48–72h at 37°C)", MCA: "No growth", XLD: "No growth", TCBS: "No growth" },
        gram_stain: "Short GP rods to long filaments; gram variable in old cultures; non-motile",
        key_biochem: [
            { test: "Catalase", result: "−", note: "KEY vs Listeria (+)" },
            { test: "Motile", result: "−", note: "" },
            { test: "TSI", result: "H₂S + (but no fermentation)", note: "KEY — H₂S in TSI for GP bacteria!" },
            { test: "Nitrate", result: "−", note: "" },
            { test: "Glucose", result: "V", note: "" },
            { test: "Maltose", result: "−", note: "" },
            { test: "Sucrose", result: "−", note: "" },
            { test: "Xylose", result: "−", note: "" },
            { test: "Esculin", result: "−", note: "" },
            { test: "Urease", result: "−", note: "" },
            { test: "CAMP test", result: "−", note: "vs Listeria (+)" },
            { test: "Hemolysis", result: "γ or α (pinpoint colony)", note: "" },
        ],
        media: ["Blood agar (BAP)", "Tryptic soy broth"],
        condition: "35–37°C, microaerophilic or anaerobic enhances; 48–72h",
        importance: "low",
        notes: "H₂S production in TSI is KEY for a GP organism. Intrinsically vancomycin resistant (unlike most GPB). Treat with penicillin. Occupational disease of pig farmers, fishermen, butchers.",
    },
    {
        id: "gardnerella_vaginalis", group: "gpb", groupLabel: "GP Bacilli", groupColor: "#fb923c",
        name: "Gardnerella vaginalis", thai: "การ์ดเนอเรลลา แวจินาลิส",
        gram: "±", morphology: "Short rods", arrangement: "Single (gram variable)",
        tags: ["Cat−", "gram variable", "clue cell", "BV", "β-hemolysis human blood", "CO2"],
        clinicalInfo: {
            naturalHabitat: "Normal vaginal flora (low numbers); overgrows in bacterial vaginosis",
            diseases: ["Bacterial vaginosis (BV): fishy odor, grey discharge, clue cells, pH >4.5", "Rarely: neonatal infection, UTI, bacteremia"],
            transmission: "Endogenous overgrowth (loss of Lactobacillus dominance)",
            notableFactors: "Clue cells (vaginal epithelial cells studded with bacteria on wet prep); whiff test (KOH + amine odor); CO₂/H₂O₂ inhibition",
        },
        colony: {
            BAP: "Pinpoint, β-hemolysis ONLY on human/rabbit blood agar (NOT sheep blood!); tiny 0.5mm",
            MCA: "No growth",
            HBT_agar: "β-hemolysis on Human Blood Tween agar (HBT)",
            XLD: "No growth", TCBS: "No growth"
        },
        gram_stain: "Gram variable (GV) short rods; tiny 0.5–1 µm; non-motile",
        key_biochem: [
            { test: "Catalase", result: "−", note: "" },
            { test: "Oxidase", result: "−", note: "" },
            { test: "Motile", result: "−", note: "" },
            { test: "TSI", result: "Not used", note: "" },
            { test: "Nitrate", result: "−", note: "" },
            { test: "Glucose", result: "+", note: "" },
            { test: "Maltose", result: "+", note: "" },
            { test: "Sucrose", result: "V", note: "" },
            { test: "Xylose", result: "V", note: "" },
            { test: "Esculin", result: "−", note: "" },
            { test: "Urease", result: "−", note: "" },
            { test: "CO₂ requirement", result: "+", note: "Needs CO₂ for growth" },
            { test: "H₂O₂ inhibition", result: "+", note: "Inhibited by H₂O₂" },
            { test: "Clue cell (wet prep)", result: "+", note: "Diagnostic for BV" },
            { test: "Whiff test (KOH)", result: "+", note: "Fishy amine odor" },
            { test: "Hemolysis (human blood)", result: "β", note: "NOT on sheep blood!" },
        ],
        media: ["Human Blood Tween (HBT) agar", "Chocolate agar + CO₂", "V agar (selective)"],
        condition: "35–37°C, 5% CO₂, 48h; anaerobic slightly enhances",
        importance: "moderate",
        notes: "Gram variable — appears gram negative or gram positive. β-hemolysis on HUMAN blood but NOT sheep blood. Clue cells on wet mount = diagnostic for BV. Treat with metronidazole (oral or vaginal gel).",
    },
    {
        id: "arcanobacterium_haemolyticum", group: "gpb", groupLabel: "GP Bacilli", groupColor: "#fb923c",
        name: "Arcanobacterium haemolyticum", thai: "อาร์คาโนแบคทีเรียม ฮีโมลิติคัม",
        gram: "+", morphology: "Short rods", arrangement: "Single",
        tags: ["Cat−", "Reverse CAMP+", "β-hemolysis", "pharyngitis", "Lecithinase−"],
        clinicalInfo: {
            naturalHabitat: "Throat and skin of humans (commensal); farm animals",
            diseases: ["Pharyngitis (mimics Streptococcus pyogenes in teenagers)", "Wound infections (chronic skin ulcers)", "Bacteremia"],
            transmission: "Direct contact; respiratory droplets",
            notableFactors: "Reverse CAMP reaction; phospholipase D; similar to GAS pharyngitis",
        },
        colony: { BAP: "Small, β-hemolytic, slow growing (48–72h); may need extended incubation", MCA: "No growth", XLD: "No growth", TCBS: "No growth" },
        gram_stain: "Short GP rods; non-motile; sometimes club-shaped",
        key_biochem: [
            { test: "Catalase", result: "−", note: "" },
            { test: "Motile", result: "−", note: "" },
            { test: "TSI", result: "Not used", note: "" },
            { test: "Nitrate", result: "−", note: "" },
            { test: "Glucose", result: "+", note: "" },
            { test: "Maltose", result: "+", note: "" },
            { test: "Sucrose", result: "V", note: "" },
            { test: "Xylose", result: "−", note: "" },
            { test: "Esculin", result: "−", note: "" },
            { test: "Urease", result: "−", note: "" },
            { test: "Hemolysis", result: "β", note: "" },
            { test: "Reverse CAMP", result: "+", note: "KEY — inhibits S. aureus β-lysin" },
            { test: "CAMP test", result: "−", note: "vs L. monocytogenes (+)" },
            { test: "Lecithinase", result: "−", note: "KEY vs A. pyogenes (+)" },
            { test: "Gelatin", result: "−", note: "KEY vs A. pyogenes (+)" },
        ],
        media: ["Blood agar (BAP)", "5% CO₂ enhances"],
        condition: "35–37°C, 5% CO₂, 48–72h",
        importance: "low",
        notes: "Reverse CAMP+ (inhibition zone) vs CAMP+ (enhanced hemolysis). Lecithinase− Gelatin− distinguishes from A. pyogenes. Often misidentified as Strep pyogenes in throat culture. Treat with penicillin.",
    },
    {
        id: "arcanobacterium_pyogenes", group: "gpb", groupLabel: "GP Bacilli", groupColor: "#fb923c",
        name: "Arcanobacterium pyogenes", thai: "อาร์คาโนแบคทีเรียม ไพโอจีนส์",
        gram: "+", morphology: "Irregular rods with branching", arrangement: "Single",
        tags: ["Cat−", "β-hemolysis", "irregular rod", "Lecithinase+", "Gelatin+", "CAMP−"],
        clinicalInfo: {
            naturalHabitat: "Animals (cattle, sheep, pigs) GI/respiratory tract",
            diseases: ["Animal infections (mastitis, pyogenic wounds)", "Human: wound infections (animal contact)", "Bacteremia (rare)"],
            transmission: "Animal contact; zoonotic",
            notableFactors: "Pyolysin (cholesterol-dependent cytolysin); irregular branching morphology",
        },
        colony: { BAP: "Small, β-hemolytic, slow growing (48–72h)", MCA: "No growth", XLD: "No growth", TCBS: "No growth" },
        gram_stain: "Irregular GP rods ± branching; non-motile",
        key_biochem: [
            { test: "Catalase", result: "−", note: "" },
            { test: "Motile", result: "−", note: "" },
            { test: "TSI", result: "Not used", note: "" },
            { test: "Nitrate", result: "−", note: "" },
            { test: "Glucose", result: "+", note: "" },
            { test: "Maltose", result: "V", note: "" },
            { test: "Sucrose", result: "V", note: "" },
            { test: "Xylose", result: "+", note: "" },
            { test: "Esculin", result: "−", note: "" },
            { test: "Urease", result: "−", note: "" },
            { test: "Hemolysis", result: "β", note: "" },
            { test: "CAMP test", result: "−", note: "vs Arcanobacterium haemolyticum = reverse+" },
            { test: "Lecithinase", result: "+", note: "KEY vs A. haemolyticum (−)" },
            { test: "Gelatin", result: "+", note: "KEY vs A. haemolyticum (−)" },
        ],
        media: ["Blood agar (BAP)", "5% CO₂"],
        condition: "35–37°C, 5% CO₂, 48–72h",
        importance: "low",
        notes: "Lecithinase+ Gelatin+ distinguishes from A. haemolyticum. Irregular branching rod morphology characteristic. Mainly veterinary pathogen.",
    },
    {
        id: "arcanobacterium_bernadiae", group: "gpb", groupLabel: "GP Bacilli", groupColor: "#fb923c",
        name: "Arcanobacterium bernadiae", thai: "อาร์คาโนแบคทีเรียม เบอร์นาไดอี",
        gram: "+", morphology: "Short rods", arrangement: "Single",
        tags: ["Cat−", "γ-hemolysis", "CAMP−", "Gelatin−", "rare"],
        clinicalInfo: {
            naturalHabitat: "Human throat and skin",
            diseases: ["Throat infections", "Wound infections (rare)"],
            transmission: "Respiratory/contact",
            notableFactors: "γ-hemolysis differentiates from A. haemolyticum and A. pyogenes (both β-hemolytic)",
        },
        colony: { BAP: "Pinpoint, γ-hemolysis; very slow growing", MCA: "No growth", XLD: "No growth", TCBS: "No growth" },
        gram_stain: "Short GP rods; non-motile",
        key_biochem: [
            { test: "Catalase", result: "−", note: "" },
            { test: "Motile", result: "−", note: "" },
            { test: "TSI", result: "Not used", note: "" },
            { test: "Nitrate", result: "−", note: "" },
            { test: "Glucose", result: "+", note: "" },
            { test: "Maltose", result: "+", note: "" },
            { test: "Sucrose", result: "−", note: "" },
            { test: "Xylose", result: "−", note: "" },
            { test: "Esculin", result: "−", note: "" },
            { test: "Urease", result: "−", note: "" },
            { test: "Hemolysis", result: "γ (none)", note: "KEY vs A. haemolyticum and A. pyogenes (both β)" },
            { test: "CAMP test", result: "−", note: "" },
            { test: "Lecithinase", result: "−", note: "" },
            { test: "Gelatin", result: "−", note: "" },
        ],
        media: ["Blood agar (BAP)", "CO₂"],
        condition: "35–37°C, CO₂, slow growing",
        importance: "low",
        notes: "γ-hemolysis is KEY distinguishing feature from A. haemolyticum (β) and A. pyogenes (β). CAMP−, Gelatin−. Rarely clinically significant. Usually contaminant.",
    },

    // ══════════════════════════════════════════════════════
    // GN DIPLOCOCCI/COCCOBACILLI — MISSING
    // ══════════════════════════════════════════════════════
    {
        id: "neisseria_mucosa", group: "gn_coccobacilli", groupLabel: "GN Coccobacilli", groupColor: "#a3e635",
        name: "Neisseria mucosa", thai: "ไนซีเรีย มิวโคซา",
        gram: "−", morphology: "Diplococci", arrangement: "Pairs",
        tags: ["mucoid colony", "CTA glucose+maltose+", "nitrate+", "non-pathogenic"],
        clinicalInfo: {
            naturalHabitat: "Normal nasopharyngeal flora; rarely pathogenic",
            diseases: ["Rarely: bacteremia, endocarditis, meningitis in immunocompromised"],
            transmission: "Respiratory droplets; normal flora",
            notableFactors: "Mucoid colony; ferments multiple sugars; nitrate positive — distinguishes from N. meningitidis",
        },
        colony: { BAP: "Medium 1–2mm, grey-white, MUCOID (key!), γ-hemolysis", ChocAgar: "Mucoid, smooth", MCA: "No growth" },
        gram_stain: "GN diplococci; mucoid capsule",
        key_biochem: [
            { test: "Oxidase", result: "+", note: "" },
            { test: "Catalase", result: "+", note: "" },
            { test: "Growth on Nutrient agar", result: "+", note: "Unlike N. gonorrhoeae" },
            { test: "CTA Glucose", result: "+", note: "" },
            { test: "CTA Maltose", result: "+", note: "" },
            { test: "CTA Lactose", result: "+", note: "KEY vs N. meningitidis (−)" },
            { test: "CTA Sucrose", result: "+", note: "KEY vs N. meningitidis (−)" },
            { test: "CTA Fructose", result: "+", note: "" },
            { test: "Nitrate reduction", result: "+", note: "KEY vs N. meningitidis (−)" },
            { test: "DNase", result: "−", note: "" },
        ],
        media: ["Chocolate agar + CO₂", "Blood agar + CO₂", "Nutrient agar"],
        condition: "35–37°C, 5% CO₂, 24–48h",
        importance: "low",
        notes: "Mucoid colony is characteristic. CTA glucose+/maltose+/lactose+/sucrose+/fructose+ all positive + Nitrate+ distinguishes from other Neisseria. Rarely pathogenic. Nitrate+ is KEY vs N. meningitidis.",
    },
    {
        id: "pasteurella_multocida", group: "gn_coccobacilli", groupLabel: "GN Coccobacilli", groupColor: "#a3e635",
        name: "Pasteurella multocida", thai: "พาสทูเรลลา มัลโทซิดา",
        gram: "−", morphology: "Coccobacilli", arrangement: "Single/pairs",
        tags: ["cat bite", "dog bite", "animal wound", "OD+", "mannitol+", "BA grows"],
        clinicalInfo: {
            naturalHabitat: "Normal oral flora of cats, dogs, rabbits; human respiratory tract",
            diseases: ["Wound infection after cat/dog bite (cellulitis within 24h)", "Respiratory infection (COPD exacerbation)", "Bacteremia, meningitis (rare)", "Pneumonia"],
            transmission: "Animal bite or scratch; animal lick on open wound; respiratory",
            notableFactors: "Polysaccharide capsule (5 types A-F); P. multocida toxin (PMT); very rapid wound infection onset (<24h)",
        },
        colony: {
            BAP: "Grey 1–2mm, γ-hemolysis; GROWS on BAP (unlike Haemophilus!); 'musty/indole' odor",
            MCA: "No growth",
            XLD: "No growth",
            TCBS: "No growth",
            NutrientAgar: "Grows (unlike Haemophilus)"
        },
        gram_stain: "GN coccobacilli; bipolar staining may be seen (safety pin appearance with Wayson stain)",
        key_biochem: [
            { test: "Oxidase", result: "+", note: "" },
            { test: "Catalase", result: "+", note: "" },
            { test: "TSI", result: "K/A", note: "Alkaline slant, acid butt" },
            { test: "Urease", result: "−", note: "vs P. dagmatis = +" },
            { test: "Motile", result: "−", note: "Non-motile" },
            { test: "OD (Ornithine)", result: "+", note: "KEY — P. multocida = OD+" },
            { test: "Mannitol", result: "+", note: "KEY vs P. canis (−)" },
            { test: "Indole", result: "+", note: "" },
            { test: "Glucose ferment", result: "+", note: "" },
            { test: "Sucrose", result: "−", note: "" },
            { test: "Growth on BAP", result: "+", note: "KEY vs Haemophilus (needs XY factors)" },
            { test: "Growth on MacConkey", result: "−", note: "" },
        ],
        media: ["Blood agar (BAP)", "Chocolate agar"],
        condition: "35–37°C, aerobic/CO₂, 24–48h",
        importance: "moderate",
        notes: "Animal bite history is key clue. Grows on BAP without XY factors (unlike Haemophilus). OD+ and Mannitol+ = P. multocida. P. canis = OD+ but Mannitol−. P. dagmatis = OD− Urease+. Treat with penicillin/amoxicillin-clavulanate.",
    },
];

// ─── UI CONSTANTS ────────────────────────────────────────────────────────────
const GROUPS = [
    { id: "all", label: "All Organisms", color: "#94a3b8", emoji: "🔬" },
    { id: "gpc_cluster", label: "GPC Cluster", color: "#c084fc", emoji: "🍇" },
    { id: "gpc_chain", label: "GPC Chain", color: "#34d399", emoji: "🔗" },
    { id: "gpb", label: "GP Bacilli", color: "#fb923c", emoji: "🧫" },
    { id: "enterobacterales", label: "Enterobacterales", color: "#f87171", emoji: "🦠" },
    { id: "vibrio", label: "Vibrionaceae", color: "#38bdf8", emoji: "🌊" },
    { id: "nfb", label: "NFB", color: "#22d3ee", emoji: "🧪" },
    { id: "gn_coccobacilli", label: "GN Coccobacilli", color: "#a3e635", emoji: "🫘" },
];

const IMPORTANCE_COLOR = { critical: "#ef4444", high: "#f97316", moderate: "#eab308" };
const IMPORTANCE_LABEL = { critical: "Critical", high: "High", moderate: "Moderate" };

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function BacteriaLibrary() {
    const [activeGroup, setActiveGroup] = useState("all");
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState(null);
    const [activeTab, setActiveTab] = useState("clinical");

    const filtered = LIBRARY.filter(b => {
        const matchGroup = activeGroup === "all" || b.group === activeGroup;
        const q = search.toLowerCase();
        const matchSearch = !q || b.name.toLowerCase().includes(q) || b.thai?.includes(q) || b.tags?.some(t => t.toLowerCase().includes(q));
        return matchGroup && matchSearch;
    });

    const selectedBug = LIBRARY.find(b => b.id === selected);
    const selectedGroup = GROUPS.find(g => g.id === (selectedBug?.group || "all"));

    return (
        <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#0b1120", minHeight: "100vh", color: "#e2e8f0" }}>
            {/* Header */}
            <div style={{ background: "linear-gradient(135deg, #0f172a, #1e1b4b)", borderBottom: "1px solid #1e293b", padding: "16px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 24 }}>📚</span>
                    <div>
                        <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: 0.5, background: "linear-gradient(90deg, #818cf8, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            Bacteria Library
                        </div>
                        <div style={{ fontSize: 10, color: "#64748b", letterSpacing: 1.5 }}>MT MICRO GUIDE · {LIBRARY.length} ORGANISMS · 7 GROUPS</div>
                    </div>
                </div>
                {/* Search */}
                <div style={{ marginTop: 12, position: "relative" }}>
                    <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#64748b" }}>🔍</span>
                    <input
                        value={search} onChange={e => setSearch(e.target.value)}
                        placeholder="Search organism, disease, test..."
                        style={{ width: "100%", background: "#1e293b", border: "1px solid #334155", borderRadius: 8, padding: "8px 10px 8px 32px", color: "#e2e8f0", fontSize: 13, outline: "none", boxSizing: "border-box" }}
                    />
                </div>
            </div>

            {/* Group Filter */}
            <div style={{ padding: "10px 20px", borderBottom: "1px solid #1e293b", display: "flex", gap: 6, flexWrap: "wrap", background: "#0f172a" }}>
                {GROUPS.map(g => (
                    <button key={g.id} onClick={() => setActiveGroup(g.id)} style={{
                        background: activeGroup === g.id ? `${g.color}25` : "transparent",
                        border: `1px solid ${activeGroup === g.id ? g.color : "#334155"}`,
                        color: activeGroup === g.id ? g.color : "#64748b",
                        borderRadius: 20, padding: "4px 10px", cursor: "pointer",
                        fontSize: 11, fontFamily: "inherit", transition: "all 0.15s"
                    }}>
                        {g.emoji} {g.label}
                    </button>
                ))}
            </div>

            {/* Count */}
            <div style={{ padding: "8px 20px", fontSize: 11, color: "#64748b", background: "#0f172a" }}>
                Showing {filtered.length} organism{filtered.length !== 1 ? "s" : ""}
            </div>

            {/* Grid + Detail */}
            <div style={{ display: "flex", height: "calc(100vh - 220px)", overflow: "hidden" }}>
                {/* Organism List */}
                <div style={{ width: selected ? "38%" : "100%", overflowY: "auto", padding: "8px 16px", transition: "width 0.2s", borderRight: selected ? "1px solid #1e293b" : "none" }}>
                    {filtered.length === 0 && (
                        <div style={{ textAlign: "center", color: "#64748b", marginTop: 40, fontSize: 13 }}>No organisms found</div>
                    )}
                    {filtered.map(b => {
                        const grp = GROUPS.find(g => g.id === b.group);
                        const isSelected = selected === b.id;
                        return (
                            <div key={b.id} onClick={() => { setSelected(b.id); setActiveTab("clinical"); }}
                                style={{ background: isSelected ? `${grp?.color}15` : "#1e293b", border: `1px solid ${isSelected ? grp?.color : "#334155"}`, borderRadius: 10, padding: 12, marginBottom: 8, cursor: "pointer", transition: "all 0.15s" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 13, fontWeight: 700, fontStyle: "italic", color: isSelected ? grp?.color : "#e2e8f0" }}>{b.name}</div>
                                        {b.thai && <div style={{ fontSize: 10, color: "#64748b", marginTop: 1 }}>{b.thai}</div>}
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
                                        <span style={{ background: `${grp?.color}20`, color: grp?.color, border: `1px solid ${grp?.color}44`, borderRadius: 10, padding: "1px 7px", fontSize: 9 }}>{grp?.emoji} {b.groupLabel}</span>
                                        {b.importance && (
                                            <span style={{ background: `${IMPORTANCE_COLOR[b.importance]}18`, color: IMPORTANCE_COLOR[b.importance], borderRadius: 10, padding: "1px 7px", fontSize: 9 }}>
                                                ● {IMPORTANCE_LABEL[b.importance]}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
                                    <span style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 4, padding: "1px 6px", fontSize: 9, color: "#94a3b8" }}>Gram {b.gram}</span>
                                    <span style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 4, padding: "1px 6px", fontSize: 9, color: "#94a3b8" }}>{b.morphology}</span>
                                    {b.tags?.slice(0, 3).map(t => (
                                        <span key={t} style={{ background: `${grp?.color}10`, color: grp?.color, borderRadius: 4, padding: "1px 6px", fontSize: 9 }}>{t}</span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Detail Panel */}
                {selectedBug && (
                    <div style={{ flex: 1, overflowY: "auto", background: "#0f172a" }}>
                        {/* Detail Header */}
                        <div style={{ background: `linear-gradient(135deg, ${selectedGroup?.color}18, #0f172a)`, borderBottom: "1px solid #1e293b", padding: "14px 18px", position: "sticky", top: 0, zIndex: 10 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <div>
                                    <div style={{ fontSize: 15, fontWeight: 800, fontStyle: "italic", color: selectedGroup?.color }}>{selectedBug.name}</div>
                                    {selectedBug.thai && <div style={{ fontSize: 11, color: "#94a3b8" }}>{selectedBug.thai}</div>}
                                    <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
                                        <span style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 12, padding: "2px 8px", fontSize: 10, color: "#94a3b8" }}>Gram {selectedBug.gram} · {selectedBug.morphology} · {selectedBug.arrangement}</span>
                                    </div>
                                </div>
                                <button onClick={() => setSelected(null)} style={{ background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>✕</button>
                            </div>
                            {/* Tabs */}
                            <div style={{ display: "flex", gap: 4, marginTop: 10 }}>
                                {["clinical", "colony", "biochem", "notes"].map(t => (
                                    <button key={t} onClick={() => setActiveTab(t)} style={{
                                        background: activeTab === t ? `${selectedGroup?.color}22` : "transparent",
                                        border: `1px solid ${activeTab === t ? selectedGroup?.color : "#334155"}`,
                                        color: activeTab === t ? selectedGroup?.color : "#64748b",
                                        borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 10, fontFamily: "inherit"
                                    }}>
                                        {t === "clinical" ? "🏥 Clinical" : t === "colony" ? "🍽 Colony/Stain" : t === "biochem" ? "⚗️ Biochemical" : "📝 Notes"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ padding: 16 }}>
                            {/* Clinical Tab */}
                            {activeTab === "clinical" && selectedBug.clinicalInfo && (
                                <div>
                                    <Section title="Natural Habitat" color={selectedGroup?.color}>
                                        <p style={{ margin: 0, fontSize: 12, color: "#94a3b8", lineHeight: 1.7 }}>{selectedBug.clinicalInfo.naturalHabitat}</p>
                                    </Section>
                                    <Section title="Diseases Caused" color={selectedGroup?.color}>
                                        {selectedBug.clinicalInfo.diseases?.map((d, i) => (
                                            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                                                <span style={{ color: selectedGroup?.color, marginTop: 1 }}>▸</span>
                                                <span style={{ fontSize: 12, color: "#cbd5e1", lineHeight: 1.5 }}>{d}</span>
                                            </div>
                                        ))}
                                    </Section>
                                    <Section title="Transmission" color={selectedGroup?.color}>
                                        <p style={{ margin: 0, fontSize: 12, color: "#94a3b8", lineHeight: 1.7 }}>{selectedBug.clinicalInfo.transmission}</p>
                                    </Section>
                                    <Section title="Key Virulence Factors" color={selectedGroup?.color}>
                                        <p style={{ margin: 0, fontSize: 12, color: "#94a3b8", lineHeight: 1.7 }}>{selectedBug.clinicalInfo.notableFactors}</p>
                                    </Section>
                                    {/* Tags */}
                                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 10 }}>
                                        {selectedBug.tags?.map(t => (
                                            <span key={t} style={{ background: `${selectedGroup?.color}15`, color: selectedGroup?.color, border: `1px solid ${selectedGroup?.color}33`, borderRadius: 12, padding: "3px 10px", fontSize: 10 }}>{t}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Colony Tab */}
                            {activeTab === "colony" && (
                                <div>
                                    <Section title="Gram Stain" color={selectedGroup?.color}>
                                        <p style={{ margin: 0, fontSize: 12, color: "#94a3b8", lineHeight: 1.7 }}>{selectedBug.gram_stain}</p>
                                    </Section>
                                    <Section title="Colony Morphology" color={selectedGroup?.color}>
                                        {Object.entries(selectedBug.colony || {}).map(([medium, desc]) => (
                                            <div key={medium} style={{ marginBottom: 8 }}>
                                                <span style={{ fontSize: 11, fontWeight: 700, color: selectedGroup?.color, background: `${selectedGroup?.color}15`, padding: "1px 8px", borderRadius: 4 }}>{medium}</span>
                                                <p style={{ margin: "4px 0 0 0", fontSize: 12, color: "#94a3b8", lineHeight: 1.6 }}>{desc}</p>
                                            </div>
                                        ))}
                                    </Section>
                                    <Section title="Culture Media" color={selectedGroup?.color}>
                                        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                                            {selectedBug.media?.map(m => (
                                                <span key={m} style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 6, padding: "3px 10px", fontSize: 11, color: "#cbd5e1" }}>{m}</span>
                                            ))}
                                        </div>
                                    </Section>
                                    <Section title="Growth Condition" color={selectedGroup?.color}>
                                        <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>{selectedBug.condition}</p>
                                    </Section>
                                </div>
                            )}

                            {/* Biochem Tab */}
                            {activeTab === "biochem" && (
                                <div>
                                    <Section title="Key Biochemical Tests" color={selectedGroup?.color}>
                                        <div style={{ overflowX: "auto" }}>
                                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                                                <thead>
                                                    <tr style={{ borderBottom: "1px solid #334155" }}>
                                                        {["Test", "Result", "Note"].map(h => (
                                                            <th key={h} style={{ textAlign: "left", padding: "6px 8px", color: "#64748b", fontWeight: 500 }}>{h}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {selectedBug.key_biochem?.map((row, i) => (
                                                        <tr key={i} style={{ borderBottom: "1px solid #1e293b22", background: i % 2 === 0 ? "#0f172a" : "transparent" }}>
                                                            <td style={{ padding: "5px 8px", color: "#cbd5e1", fontWeight: 500 }}>{row.test}</td>
                                                            <td style={{ padding: "5px 8px" }}>
                                                                <span style={{
                                                                    fontWeight: 700, fontSize: 12,
                                                                    color: row.result.startsWith("+") ? "#4ade80" : row.result.startsWith("−") || row.result.startsWith("-") ? "#f87171" : row.result === "S" ? "#38bdf8" : row.result === "R" ? "#f97316" : "#fbbf24"
                                                                }}>{row.result}</span>
                                                            </td>
                                                            <td style={{ padding: "5px 8px", color: "#64748b", fontSize: 10 }}>{row.note}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </Section>
                                </div>
                            )}

                            {/* Notes Tab */}
                            {activeTab === "notes" && (
                                <Section title="Clinical Notes & Key Points" color={selectedGroup?.color}>
                                    <p style={{ margin: 0, fontSize: 12, color: "#94a3b8", lineHeight: 1.8 }}>{selectedBug.notes}</p>
                                </Section>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function Section({ title, color, children }) {
    return (
        <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <span style={{ width: 3, height: 14, background: color, borderRadius: 2, display: "block" }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: color, letterSpacing: 0.5, textTransform: "uppercase" }}>{title}</span>
            </div>
            <div style={{ paddingLeft: 9 }}>{children}</div>
        </div>
    );
}
