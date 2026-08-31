const BANK = {
  mathematics: [
    ['If 3x + 5 = 20, what is x?', ['3', '5', '8', '15'], 'b', 'Subtract 5, then divide 15 by 3.'],
    ['What is 15% of 200?', ['15', '20', '30', '45'], 'c', '0.15 × 200 = 30.'],
    ['A rectangle has length 8 and width 5. What is its area?', ['13', '26', '40', '80'], 'c', 'Area equals length × width: 8 × 5 = 40.'],
    ['What is the next number: 2, 6, 12, 20, 30, ...?', ['36', '40', '42', '44'], 'c', 'The differences are 4, 6, 8, 10, then 12; 30 + 12 = 42.'],
    ['Simplify 2³ × 2².', ['2⁵', '4⁵', '2⁶', '4⁶'], 'a', 'For equal bases, add exponents: 2^(3+2) = 2⁵.'],
    ['The average of 6, 8, and 10 is:', ['7', '8', '9', '10'], 'b', '(6 + 8 + 10) / 3 = 8.'],
    ['What is √144?', ['10', '11', '12', '14'], 'c', '12 × 12 = 144.'],
    ['A $50 item is discounted by 20%. What is the sale price?', ['$10', '$30', '$40', '$45'], 'c', 'The discount is $10, so the sale price is $40.'],
    ['Which fraction is equal to 0.75?', ['1/4', '1/2', '3/4', '4/3'], 'c', '0.75 = 75/100 = 3/4.'],
    ['If y = 2x + 1 and x = 4, what is y?', ['7', '8', '9', '10'], 'c', 'Substitute x = 4: y = 2(4) + 1 = 9.'],
    ['What is the perimeter of a square with side length 7?', ['14', '21', '28', '49'], 'c', 'A square has four equal sides: 4 × 7 = 28.'],
    ['Solve: 5(x − 2) = 25.', ['3', '5', '7', '10'], 'c', 'Divide by 5 to get x − 2 = 5, so x = 7.'],
  ],
  english: [
    ['Choose the sentence with correct subject-verb agreement.', ['The list of items are on the desk.', 'The list of items is on the desk.', 'The items list is on the desk.', 'The list are on the desk.'], 'b', 'The subject “list” is singular, so it takes “is.”'],
    ['Which word is closest in meaning to “abundant”?', ['Scarce', 'Plentiful', 'Hidden', 'Fragile'], 'b', '“Abundant” means existing in large quantities.'],
    ['Choose the correctly punctuated sentence.', ['After dinner we went, for a walk.', 'After dinner, we went for a walk.', 'After, dinner we went for a walk.', 'After dinner we, went for a walk.'], 'b', 'An introductory phrase is followed by a comma.'],
    ['What is the antonym of “reluctant”?', ['Unwilling', 'Hesitant', 'Eager', 'Careful'], 'c', '“Eager” is the opposite of unwilling or reluctant.'],
    ['Identify the adverb: “She answered the question confidently.”', ['She', 'answered', 'question', 'confidently'], 'd', '“Confidently” modifies the verb “answered.”'],
    ['Choose the modal verb showing obligation: “You ___ wear a seat belt; it is required.”', ['might', 'could', 'must', 'would'], 'c', '“Must” expresses a strong obligation or requirement.'],
    ['Which is a complete sentence?', ['Because the rain stopped.', 'Running through the park.', 'The rain stopped suddenly.', 'While we waited.'], 'c', 'It has a subject and a complete predicate.'],
    ['Choose the best transition: “The route was longer. ___, it was safer.”', ['However', 'For example', 'Similarly', 'Therefore'], 'a', '“However” signals contrast.'],
    ['Which word is spelled correctly?', ['Accomodate', 'Acommodate', 'Accommodate', 'Acomodate'], 'c', '“Accommodate” contains two c’s and two m’s.'],
    ['Choose the active-voice sentence.', ['The report was written by Mina.', 'Mina wrote the report.', 'The report had been written.', 'The report is being written.'], 'b', 'The subject Mina directly performs the action.'],
    ['What does “infer” mean?', ['To state directly', 'To conclude from evidence', 'To memorize', 'To disagree'], 'b', 'To infer is to reach a conclusion based on evidence.'],
    ['Select the correct pronoun: “The teacher spoke to Rina and ___.”', ['I', 'me', 'my', 'mine'], 'b', 'The pronoun is the object of “to,” so “me” is correct.'],
    ['Choose the correct possessive form.', ['The students book', "The student's book", 'The students book’s', 'The student book'], 'b', 'The apostrophe before s shows that the book belongs to one student.'],
    ['Complete the sentence: “If I ___ you, I would apologize.”', ['am', 'was', 'were', 'be'], 'c', '“Were” is used in this unreal conditional construction.'],
    ['Which sentence uses a formal academic tone?', ['Kids get stuff wrong sometimes.', 'The results indicate a significant improvement.', 'Things got way better.', 'It was super good.'], 'b', 'The sentence uses precise, objective, and formal language.'],
    ['Choose the correct word: “___ going to submit their project today.”', ['There', 'Their', 'They’re', 'Theirs'], 'c', '“They’re” is the contraction of “they are.”'],
    ['Read: “Maya reviewed every chapter and practiced daily. Her score improved greatly.” What is the main idea?', ['Maya disliked studying.', 'Regular preparation improved Maya’s score.', 'The exam was cancelled.', 'Maya studied only one chapter.'], 'b', 'The details show that consistent preparation led to improvement.'],
    ['Identify the direct object: “The chef prepared the meal.”', ['chef', 'prepared', 'the meal', 'The'], 'c', '“The meal” directly receives the action of the verb “prepared.”'],
    ['Choose the correct comparative form: “This route is ___ than the other one.”', ['short', 'shorter', 'shortest', 'more short'], 'b', 'The comparative form of the one-syllable adjective “short” is “shorter.”'],
    ['Complete the sentence: “She is interested ___ astronomy.”', ['at', 'on', 'in', 'for'], 'c', 'The adjective “interested” is followed by the preposition “in.”'],
    ['Identify the gerund: “Swimming improves cardiovascular health.”', ['Swimming', 'improves', 'cardiovascular', 'health'], 'a', '“Swimming” is a verb form acting as a noun.'],
    ['What does the prefix “un-” mean in “unfair”?', ['Again', 'Not', 'Before', 'Very'], 'b', 'The prefix “un-” commonly means “not.”'],
    ['Which word contains a suffix meaning “a person who”?', ['Rewrite', 'Teacher', 'Unclear', 'Careless'], 'b', 'The suffix “-er” in “teacher” identifies a person who teaches.'],
    ['Which sentence contains a metaphor?', ['The wind sounded like music.', 'The classroom was a zoo.', 'The baby slept quietly.', 'The car moved slowly.'], 'b', 'It directly compares the classroom to a zoo without using “like” or “as.”'],
    ['Identify the dependent clause: “Although it was raining, we continued the match.”', ['we continued', 'the match', 'Although it was raining', 'continued the match'], 'c', 'It begins with a subordinating conjunction and cannot stand alone.'],
    ['Choose the correct article: “She wants to become ___ engineer.”', ['a', 'an', 'the', 'no article'], 'b', '“Engineer” begins with a vowel sound, so it takes “an.”'],
    ['Choose the correct reported speech: Rafi said, “I am tired.”', ['Rafi said that I am tired.', 'Rafi said that he was tired.', 'Rafi says he tired.', 'Rafi said he is tiring.'], 'b', 'The pronoun changes to “he” and the tense shifts to “was.”'],
    ['What is the tone of the sentence “Unfortunately, the experiment did not produce reliable results”?', ['Celebratory', 'Regretful', 'Humorous', 'Angry'], 'b', '“Unfortunately” and the negative outcome create a regretful tone.'],
    ['Choose the sentence with parallel structure.', ['She likes reading, to swim, and cycling.', 'She likes to read, swimming, and cycles.', 'She likes reading, swimming, and cycling.', 'She likes read, swim, and cycling.'], 'c', 'All three items use the same “-ing” grammatical form.'],
    ['Which sentence uses a semicolon correctly?', ['The rain stopped; we continued the match.', 'The rain; stopped we continued.', 'The rain stopped; and continued.', 'The; rain stopped, we continued.'], 'a', 'A semicolon can join two closely related independent clauses.'],
  ],
  science: [
    ['Which organelle is known as the powerhouse of the cell?', ['Nucleus', 'Mitochondrion', 'Ribosome', 'Golgi apparatus'], 'b', 'Mitochondria produce most cellular ATP.'],
    ['What is the chemical formula for water?', ['CO₂', 'O₂', 'H₂O', 'NaCl'], 'c', 'Water contains two hydrogen atoms and one oxygen atom.'],
    ['Which force keeps planets in orbit around the Sun?', ['Friction', 'Magnetism', 'Gravity', 'Buoyancy'], 'c', 'Gravity attracts planets toward the Sun.'],
    ['Plants primarily absorb which gas for photosynthesis?', ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'], 'c', 'Plants use carbon dioxide to produce glucose.'],
    ['At sea level, pure water boils at:', ['0°C', '50°C', '100°C', '212°C only'], 'c', 'The Celsius boiling point at standard pressure is 100°C.'],
    ['Which blood cells help fight infection?', ['Red blood cells', 'White blood cells', 'Platelets', 'Plasma only'], 'b', 'White blood cells are central to immune defense.'],
    ['Which state of matter has a definite volume but no definite shape?', ['Solid', 'Liquid', 'Gas', 'Plasma'], 'b', 'A liquid takes the shape of its container but keeps its volume.'],
    ['What is the closest star to Earth?', ['Sirius', 'Alpha Centauri', 'The Sun', 'Polaris'], 'c', 'The Sun is Earth’s nearest star.'],
    ['An object at rest tends to remain at rest. This describes:', ['Newton’s first law', 'Newton’s second law', 'Newton’s third law', 'The law of gravitation'], 'a', 'Newton’s first law is the law of inertia.'],
    ['A substance with pH 3 is:', ['Acidic', 'Neutral', 'Basic', 'Radioactive'], 'a', 'A pH below 7 is acidic.'],
    ['Which part of an atom has a positive charge?', ['Electron', 'Neutron', 'Proton', 'Photon'], 'c', 'Protons carry positive electric charge.'],
    ['What is the process by which liquid changes to gas?', ['Condensation', 'Freezing', 'Evaporation', 'Sublimation'], 'c', 'Evaporation is the liquid-to-gas phase change.'],
    ['Which planet is often called the Red Planet?', ['Venus', 'Mars', 'Jupiter', 'Mercury'], 'b', 'Iron minerals on Mars oxidize and give the surface its reddish colour.'],
    ['Which gas is released by plants during photosynthesis?', ['Carbon dioxide', 'Nitrogen', 'Oxygen', 'Methane'], 'c', 'Photosynthesis releases oxygen as a by-product.'],
    ['What is the SI unit of force?', ['Joule', 'Newton', 'Watt', 'Pascal'], 'b', 'Force is measured in newtons (N).'],
    ['Which material is the best electrical conductor?', ['Rubber', 'Glass', 'Copper', 'Wood'], 'c', 'Copper allows electric charge to flow easily.'],
    ['In most human cells, DNA is mainly stored in the:', ['Cell membrane', 'Nucleus', 'Cytoplasm', 'Vacuole'], 'b', 'Most cellular DNA is contained in the nucleus.'],
    ['Why can sound not travel through a vacuum?', ['It is too cold.', 'There are no particles to carry vibrations.', 'Gravity stops it.', 'Light blocks it.'], 'b', 'Sound needs a material medium whose particles can vibrate.'],
    ['The energy possessed by a moving object is called:', ['Chemical energy', 'Potential energy', 'Kinetic energy', 'Nuclear energy'], 'c', 'Kinetic energy is the energy of motion.'],
    ['What is the largest organ of the human body?', ['Heart', 'Liver', 'Skin', 'Lung'], 'c', 'The skin is the body’s largest organ by surface area and mass.'],
    ['Blue litmus paper turns red in a:', ['Base', 'Neutral solution', 'Acid', 'Salt crystal only'], 'c', 'Acids turn blue litmus paper red.'],
    ['Which is a renewable source of energy?', ['Coal', 'Natural gas', 'Solar energy', 'Petroleum'], 'c', 'Sunlight is naturally replenished and is therefore renewable.'],
    ['Density is calculated as:', ['Mass × volume', 'Mass ÷ volume', 'Volume ÷ mass', 'Mass + volume'], 'b', 'Density equals mass divided by volume.'],
    ['Which organism is a producer in an ecosystem?', ['Grass', 'Lion', 'Mushroom', 'Eagle'], 'a', 'Grass makes its own food through photosynthesis.'],
    ['Light travels fastest through:', ['Water', 'Glass', 'A vacuum', 'Steel'], 'c', 'Light reaches its maximum speed in a vacuum.'],
    ['What is the basic unit of heredity?', ['Cell', 'Gene', 'Tissue', 'Protein'], 'b', 'A gene is a segment of DNA that carries hereditary information.'],
    ['Earthquakes commonly occur near:', ['Cloud layers', 'Tectonic plate boundaries', 'River mouths', 'The equator only'], 'b', 'Stress and movement are concentrated where tectonic plates meet.'],
    ['A rocket moves upward because gases are pushed downward. This illustrates:', ['Newton’s first law', 'Newton’s second law', 'Newton’s third law', 'Ohm’s law'], 'c', 'Every action has an equal and opposite reaction.'],
    ['What is the SI unit of electric current?', ['Volt', 'Ohm', 'Ampere', 'Coulomb'], 'c', 'Electric current is measured in amperes (A).'],
    ['Which gas is a major contributor to the enhanced greenhouse effect?', ['Oxygen', 'Carbon dioxide', 'Helium', 'Hydrogen'], 'b', 'Increasing carbon dioxide traps more heat in Earth’s atmosphere.'],
  ],
};

const EXAM_BANKS = {
  'ielts:reading': [
    ['Passage: “Urban trees lower street temperatures by providing shade and releasing water vapour. They can also reduce air pollution by trapping some airborne particles.” What is the main idea?', ['Trees make cities colder only in winter.', 'Urban trees can improve city environments in several ways.', 'Air pollution is caused mainly by trees.', 'Water vapour always increases pollution.'], 'b', 'The passage lists several environmental benefits of urban trees.'],
    ['Passage: “The museum extended its opening hours after visitor surveys showed strong demand for evening access.” Why were the opening hours extended?', ['To reduce staffing costs', 'Because visitors requested evening access', 'To close during mornings', 'Because the museum moved location'], 'b', 'The survey showed demand for evening access.'],
    ['Passage: “Although the first trial produced disappointing results, the researchers refined the method and achieved a significant improvement in the second trial.” The word “refined” most nearly means:', ['Abandoned', 'Improved', 'Copied', 'Delayed'], 'b', 'Here “refined” means improved or adjusted carefully.'],
    ['Passage: “Many commuters said they would cycle more often if secure bicycle parking were available near stations.” What can be inferred?', ['Secure parking may encourage more cycling.', 'Commuters dislike railway stations.', 'Cycling is already the only form of transport.', 'Parking has no effect on travel choices.'], 'a', 'The conditional statement suggests secure parking could increase cycling.'],
    ['Passage: “The island receives little rainfall for most of the year; nevertheless, farms remain productive because water is stored during the short wet season.” What does “nevertheless” signal?', ['Cause', 'Contrast', 'Example', 'Sequence'], 'b', 'It contrasts low rainfall with continued farm productivity.'],
    ['Passage: “The company introduced reusable packaging in 2022. By 2025, its use of single-use plastic had fallen by 40 percent.” Which statement is supported?', ['Reusable packaging was introduced after 2025.', 'Single-use plastic increased by 40 percent.', 'The company reduced its reliance on single-use plastic.', 'The company stopped using all plastic.'], 'c', 'The passage explicitly states that single-use plastic use fell.'],
    ['Passage: “Some historians argue that the road was built mainly for trade, while others believe military movement was the primary purpose.” What is the writer presenting?', ['A proven fact with no disagreement', 'Two competing interpretations', 'A list of road materials', 'A personal travel story'], 'b', 'The sentence contrasts two interpretations offered by historians.'],
    ['Passage: “Applications must be submitted by 5 p.m. Friday. Forms received after the deadline will not be considered.” What should an applicant do?', ['Submit before 5 p.m. Friday', 'Submit on Saturday morning', 'Wait for a second deadline', 'Send only part of the form'], 'a', 'The stated deadline is 5 p.m. Friday.'],
    ['Passage: “The new library has fewer printed journals than the old one, but it provides access to a much larger collection of digital journals.” Which comparison is correct?', ['Both collections are smaller.', 'Printed journals increased.', 'Digital access is larger despite fewer printed journals.', 'The old library had no journals.'], 'c', 'The passage contrasts fewer print journals with more digital access.'],
    ['Passage: “The species was once common throughout the valley. Today it survives only in a few protected areas.” What has happened to the species?', ['Its range has decreased.', 'It has become more common.', 'It moved to cities only.', 'It is no longer protected.'], 'a', 'It now survives in only a few areas, so its range has declined.'],
  ],
  'ielts:listening': [
    ['Listening practice transcript: “The library tour starts at quarter past ten, not ten o’clock as printed on the old notice.” When does the tour start?', ['10:00', '10:15', '10:30', '10:45'], 'b', 'Quarter past ten means 10:15.'],
    ['Listening practice transcript: “Please meet outside the science building, beside the main bicycle racks.” Where should students meet?', ['Inside the library', 'Beside the bicycle racks', 'At the bus station', 'In the cafeteria'], 'b', 'The speaker specifies the bicycle racks outside the science building.'],
    ['Listening practice transcript: “The course fee is 120 dollars, but students who register before Monday pay only 95.” What is the early registration fee?', ['$25', '$95', '$120', '$215'], 'b', 'Students registering early pay $95.'],
    ['Listening practice transcript: “I originally booked Room 14, but we have moved the meeting to Room 21 because the group is larger than expected.” Which room will be used?', ['Room 7', 'Room 14', 'Room 20', 'Room 21'], 'd', 'The speaker says the meeting was moved to Room 21.'],
    ['Listening practice transcript: “The train normally leaves at 6:40, but tonight it will depart twenty minutes later.” What time will it leave tonight?', ['6:20', '6:40', '7:00', '7:20'], 'c', 'Twenty minutes after 6:40 is 7:00.'],
    ['Listening practice transcript: “Bring a notebook and a pen. You do not need to bring a calculator because one will be provided.” What is NOT required?', ['A notebook', 'A pen', 'A calculator', 'Attendance'], 'c', 'Calculators will be provided.'],
    ['Listening practice transcript: “The café is closed on Sundays, but it is open from eight until four on Saturdays.” When is the café closed?', ['Saturday', 'Sunday', 'Monday', 'Every afternoon'], 'b', 'The speaker says it is closed on Sundays.'],
    ['Listening practice transcript: “To reach the sports centre, go past the bank and turn left immediately after the pharmacy.” Where should you turn left?', ['Before the bank', 'At the bank', 'After the pharmacy', 'At the sports centre'], 'c', 'The instruction is to turn left immediately after the pharmacy.'],
    ['Listening practice transcript: “There are three workshops, but beginners should attend the first one because the later sessions assume previous experience.” Which workshop is recommended for beginners?', ['The first', 'The second', 'The third', 'Any workshop'], 'a', 'The first workshop is specifically recommended for beginners.'],
    ['Listening practice transcript: “Your appointment is on the thirteenth of May, at two thirty in the afternoon.” When is the appointment?', ['May 3 at 2:30', 'May 13 at 2:30', 'May 30 at 2:13', 'March 13 at 2:30'], 'b', 'The speaker gives May 13 at 2:30 p.m.'],
  ],
  'gre:verbal reasoning': [
    ['Because the evidence was incomplete, the researcher remained ___ about drawing a firm conclusion.', ['dogmatic', 'cautious', 'indifferent', 'reckless'], 'b', 'Incomplete evidence calls for a cautious conclusion.'],
    ['Choose the word closest in meaning to “laconic.”', ['Brief', 'Emotional', 'Confusing', 'Decorative'], 'a', '“Laconic” means using very few words.'],
    ['The critic praised the novel’s ambition but found its plot unnecessarily ___.', ['lucid', 'convoluted', 'concise', 'transparent'], 'b', '“Convoluted” means overly complex or difficult to follow.'],
    ['Passage: “The policy reduced short-term traffic, but researchers found no evidence that it changed long-term commuting habits.” Which conclusion is best supported?', ['The policy permanently eliminated traffic.', 'The policy had a short-term effect but no demonstrated long-term behavioral effect.', 'Researchers opposed all transport policies.', 'Commuting habits changed immediately and permanently.'], 'b', 'That statement directly reflects both parts of the passage.'],
    ['Choose the word most nearly opposite in meaning to “mitigate.”', ['Reduce', 'Worsen', 'Explain', 'Measure'], 'b', 'To mitigate is to make less severe; “worsen” is the opposite.'],
    ['Although the speaker was known for being reserved, her response to the accusation was surprisingly ___.', ['vehement', 'muted', 'tentative', 'apathetic'], 'a', '“Vehement” fits the contrast with reserved behavior.'],
    ['Passage: “A correlation between two variables does not by itself establish that one causes the other.” What warning is being made?', ['Correlation always proves causation.', 'Causal claims require more than correlation.', 'Variables cannot be compared.', 'Causes never have measurable effects.'], 'b', 'The passage distinguishes association from causation.'],
    ['The committee’s decision was not arbitrary; it was based on a ___ review of the evidence.', ['perfunctory', 'systematic', 'capricious', 'haphazard'], 'b', 'A systematic review is organized and evidence-based.'],
    ['Choose the word closest in meaning to “equivocal.”', ['Unambiguous', 'Ambiguous', 'Generous', 'Hostile'], 'b', '“Equivocal” means ambiguous or open to more than one interpretation.'],
    ['The new evidence did not ___ the original theory; instead, it strengthened it.', ['corroborate', 'undermine', 'clarify', 'describe'], 'b', 'The contrast indicates the evidence did not weaken or undermine the theory.'],
  ],
  'sat:reading and writing': [
    ['The research team collected data from five sites. ___, the team compared the results across regions.', ['Next', 'However', 'For example', 'Instead'], 'a', '“Next” logically signals the following step in a sequence.'],
    ['Which choice completes the sentence with correct subject-verb agreement? “The collection of rare maps ___ in a climate-controlled room.”', ['are stored', 'is stored', 'store', 'have stored'], 'b', 'The singular subject “collection” takes “is stored.”'],
    ['Passage: “After the city added protected bike lanes, bicycle use increased on the affected streets.” Which claim is best supported?', ['Bike lanes were associated with increased bicycle use.', 'All residents stopped driving.', 'The city removed public transport.', 'Bicycle use decreased everywhere else.'], 'a', 'The passage supports an association on the affected streets.'],
    ['Which choice is the most concise? “Due to the fact that the experiment was delayed, the report was submitted late.”', ['Because the experiment was delayed, the report was submitted late.', 'Owing to the fact of delay, the report was late in submission.', 'The report was submitted late because of the experiment being delayed in time.', 'Due to there being a delay in the experiment, the report submission was late.'], 'a', 'It preserves the meaning with the fewest unnecessary words.'],
    ['Choose the correctly punctuated sentence.', ['The solution however was temporary.', 'The solution, however, was temporary.', 'The solution however, was temporary.', 'The solution; however was temporary.'], 'b', 'The interrupting transition “however” is set off by commas.'],
    ['Passage: “Unlike the earlier model, the revised model accounts for seasonal changes.” What is the main contrast?', ['The revised model includes a factor the earlier model omitted.', 'The earlier model is newer.', 'Both models ignore seasons.', 'Seasonal changes are impossible to measure.'], 'a', 'The revised model accounts for seasonal changes, unlike the earlier one.'],
    ['Which choice best maintains a formal academic tone?', ['The results were super surprising.', 'The results were pretty wild.', 'The results were statistically significant.', 'The results were kind of interesting.'], 'c', '“Statistically significant” is precise and formal.'],
    ['Complete the sentence: “The samples were collected in June ___ analyzed in July.”', [', and', ', but', '; and', 'and,'], 'a', 'A comma plus coordinating conjunction is the best option here.'],
    ['Passage: “The author cites two independent studies that reached similar conclusions.” Why does the author most likely mention both studies?', ['To strengthen the claim with multiple sources', 'To show the studies contradict each other', 'To avoid making any claim', 'To describe the authors’ biographies'], 'a', 'Multiple independent sources can strengthen evidentiary support.'],
    ['Which choice correctly uses the possessive form? “The ___ findings were published together.”', ["researchers'", 'researchers', "researcher's", 'researchers’s'], 'a', 'The apostrophe after plural “researchers” shows possession.'],
  ],
};

function title(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const OPTION_IDS = ['a', 'b', 'c', 'd'];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffled(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = randomInt(0, i);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function numberQuestion(id, prompt, correct, distractors, explanation) {
  const correctText = String(correct);
  const choices = [correctText];

  for (const candidate of distractors) {
    const text = String(candidate);
    if (!choices.includes(text)) choices.push(text);
  }

  let offset = 1;
  while (choices.length < 4) {
    const text = String(Number(correct) + offset);
    if (!choices.includes(text)) choices.push(text);
    offset += 1;
  }

  const options = shuffled(choices.slice(0, 4)).map((text, index) => ({
    id: OPTION_IDS[index],
    text,
  }));

  return {
    id,
    prompt,
    options,
    correctOptionId: options.find((option) => option.text === correctText).id,
    explanation,
  };
}

function choiceQuestion(id, prompt, correct, distractors, explanation) {
  const choices = [String(correct), ...distractors.map(String)];
  const uniqueChoices = [...new Set(choices)].slice(0, 4);
  if (uniqueChoices.length !== 4) throw new Error('A question must have four unique choices');

  const options = shuffled(uniqueChoices).map((text, index) => ({
    id: OPTION_IDS[index],
    text,
  }));

  return {
    id,
    prompt,
    options,
    correctOptionId: options.find((option) => option.text === String(correct)).id,
    explanation,
  };
}

function generateMathQuestion(id, mode, difficulty) {
  const range = difficulty === 'hard' ? 50 : difficulty === 'easy' ? 12 : 25;

  if (mode === 0) {
    const a = randomInt(2, difficulty === 'hard' ? 12 : 8);
    const x = randomInt(2, range);
    const b = randomInt(1, range);
    const total = a * x + b;
    return numberQuestion(id, `If ${a}x + ${b} = ${total}, what is x?`, x, [x + 1, Math.max(1, x - 1), x + a], `Subtract ${b}, then divide by ${a}.`);
  }

  if (mode === 1) {
    const percent = shuffled([5, 10, 15, 20, 25, 30, 40, 50])[0];
    const base = randomInt(2, difficulty === 'hard' ? 40 : 20) * 20;
    const answer = (percent * base) / 100;
    return numberQuestion(id, `What is ${percent}% of ${base}?`, answer, [answer + percent, Math.max(1, answer - percent), answer * 2], `${percent} ÷ 100 × ${base} = ${answer}.`);
  }

  if (mode === 2) {
    const length = randomInt(3, range);
    const width = randomInt(2, Math.max(3, Math.floor(range / 2)));
    const area = length * width;
    return numberQuestion(id, `A rectangle has length ${length} and width ${width}. What is its area?`, area, [length + width, 2 * (length + width), area + length], `Area = length × width = ${length} × ${width} = ${area}.`);
  }

  if (mode === 3) {
    const average = randomInt(5, range);
    const gap = randomInt(1, Math.max(2, Math.floor(range / 4)));
    const values = [average - gap, average, average + gap];
    return numberQuestion(id, `What is the average of ${values.join(', ')}?`, average, [average + gap, average - gap, average * 2], `Their sum is ${average * 3}; dividing by 3 gives ${average}.`);
  }

  if (mode === 4) {
    const root = randomInt(3, difficulty === 'hard' ? 25 : 15);
    const square = root * root;
    return numberQuestion(id, `What is √${square}?`, root, [root + 1, root - 1, root * 2], `${root} × ${root} = ${square}.`);
  }

  if (mode === 5) {
    const side = randomInt(3, range);
    const perimeter = side * 4;
    return numberQuestion(id, `What is the perimeter of a square with side length ${side}?`, perimeter, [side * 2, side * side, perimeter + side], `A square has four equal sides: 4 × ${side} = ${perimeter}.`);
  }

  if (mode === 6) {
    const m = randomInt(2, difficulty === 'hard' ? 10 : 6);
    const x = randomInt(2, range);
    const b = randomInt(1, range);
    const y = m * x + b;
    return numberQuestion(id, `If y = ${m}x + ${b} and x = ${x}, what is y?`, y, [y - b, y + m, m + x + b], `Substitute x = ${x}: y = ${m}(${x}) + ${b} = ${y}.`);
  }

  if (mode === 7) {
    const divisor = randomInt(2, difficulty === 'hard' ? 15 : 10);
    const quotient = randomInt(2, range);
    const dividend = divisor * quotient;
    return numberQuestion(id, `What is ${dividend} ÷ ${divisor}?`, quotient, [quotient + divisor, quotient - 1, divisor], `${dividend} ÷ ${divisor} = ${quotient}.`);
  }

  if (mode === 8) {
    const start = randomInt(1, range);
    const difference = randomInt(2, difficulty === 'hard' ? 15 : 8);
    const sequence = Array.from({ length: 4 }, (_, index) => start + index * difference);
    const next = start + 4 * difference;
    return numberQuestion(id, `What is the next number: ${sequence.join(', ')}, ...?`, next, [next + difference, next - 1, next + 1], `The common difference is ${difference}, so the next number is ${next}.`);
  }

  if (mode === 9) {
    const a = randomInt(2, range);
    const b = randomInt(2, range);
    const product = a * b;
    return numberQuestion(id, `Calculate ${a} × ${b}.`, product, [product + a, product - b, a + b], `${a} × ${b} = ${product}.`);
  }

  if (mode === 10) {
    const base = randomInt(2, range) * 2;
    const height = randomInt(2, Math.max(4, Math.floor(range / 2)));
    const area = (base * height) / 2;
    return numberQuestion(id, `A triangle has base ${base} and height ${height}. What is its area?`, area, [base * height, base + height, area + height], `Triangle area = ½ × ${base} × ${height} = ${area}.`);
  }

  if (mode === 11) {
    const firstPart = randomInt(2, 7);
    const secondPart = randomInt(firstPart + 1, 10);
    const multiplier = randomInt(2, range);
    const firstValue = firstPart * multiplier;
    const secondValue = secondPart * multiplier;
    return numberQuestion(id, `The ratio of two numbers is ${firstPart}:${secondPart}. If the first number is ${firstValue}, what is the second?`, secondValue, [firstValue + secondPart, secondValue - multiplier, firstValue * secondPart], `One ratio part is ${multiplier}; ${secondPart} parts equal ${secondValue}.`);
  }

  if (mode === 12) {
    const principal = randomInt(2, difficulty === 'hard' ? 30 : 15) * 100;
    const rate = shuffled([5, 8, 10, 12])[0];
    const years = randomInt(1, difficulty === 'hard' ? 5 : 3);
    const interest = (principal * rate * years) / 100;
    return numberQuestion(id, `Find the simple interest on $${principal} at ${rate}% per year for ${years} year${years > 1 ? 's' : ''}.`, interest, [interest + principal, interest / years, principal * rate / 100], `Simple interest = P × R × T ÷ 100 = $${interest}.`);
  }

  if (mode === 13) {
    const price = randomInt(3, difficulty === 'hard' ? 40 : 20) * 20;
    const discount = shuffled([10, 20, 25, 30, 40, 50])[0];
    const salePrice = price - (price * discount) / 100;
    return numberQuestion(id, `An item costs $${price} and has a ${discount}% discount. What is the sale price?`, salePrice, [price * discount / 100, price - discount, salePrice + discount], `The discount is $${price * discount / 100}, so the sale price is $${salePrice}.`);
  }

  if (mode === 14) {
    const speed = randomInt(3, difficulty === 'hard' ? 25 : 15) * 5;
    const time = randomInt(2, difficulty === 'hard' ? 8 : 5);
    const distance = speed * time;
    return numberQuestion(id, `A car travels at ${speed} km/h for ${time} hours. How far does it travel?`, distance, [speed + time, distance - speed, distance + time], `Distance = speed × time = ${speed} × ${time} = ${distance} km.`);
  }

  if (mode === 15) {
    const kilometres = randomInt(2, range);
    const metres = kilometres * 1000;
    return numberQuestion(id, `Convert ${kilometres} kilometres to metres.`, metres, [kilometres * 100, kilometres * 10, metres + kilometres], `1 kilometre = 1000 metres, so ${kilometres} km = ${metres} m.`);
  }

  if (mode === 16) {
    const factor = randomInt(2, difficulty === 'hard' ? 15 : 10);
    const [m, n] = shuffled([[2, 3], [3, 4], [4, 5], [5, 6], [5, 7], [7, 8]])[0];
    const first = factor * m;
    const second = factor * n;
    return numberQuestion(id, `What is the greatest common divisor of ${first} and ${second}?`, factor, [m, n, factor * 2], `${factor} is the greatest number that divides both values.`);
  }

  if (mode === 17) {
    const [first, second] = shuffled([[2, 3], [3, 4], [3, 5], [4, 5], [5, 7], [7, 8]])[0];
    const lcm = first * second;
    return numberQuestion(id, `What is the least common multiple of ${first} and ${second}?`, lcm, [first + second, lcm - first, lcm + second], `${first} and ${second} share no common factor greater than 1, so their LCM is ${lcm}.`);
  }

  if (mode === 18) {
    const red = randomInt(2, 8);
    let blue = randomInt(2, 8);
    while (blue === red) blue = randomInt(2, 8);
    const total = red + blue;
    const correct = `${red}/${total}`;
    return choiceQuestion(id, `A bag has ${red} red and ${blue} blue balls. What is the probability of choosing a red ball?`, correct, [`${blue}/${total}`, `1/${total}`, `${red}/${blue}`], `There are ${red} favourable outcomes out of ${total} total outcomes.`);
  }

  if (mode === 19) {
    const denominator = shuffled([5, 6, 7, 8, 9, 10])[0];
    const first = randomInt(1, denominator - 3);
    const second = randomInt(1, denominator - first - 1);
    const numerator = first + second;
    const correct = `${numerator}/${denominator}`;
    return choiceQuestion(id, `Calculate ${first}/${denominator} + ${second}/${denominator}.`, correct, [`${numerator}/${denominator * 2}`, `${Math.abs(first - second)}/${denominator}`, `${numerator + 1}/${denominator}`], `The denominators match, so add the numerators: ${first} + ${second} = ${numerator}.`);
  }

  if (mode === 20) {
    const start = randomInt(1, range);
    const step = randomInt(2, 6);
    const values = Array.from({ length: 5 }, (_, index) => start + index * step);
    const median = values[2];
    return numberQuestion(id, `What is the median of ${values.join(', ')}?`, median, [values[1], values[3], Math.round(values.reduce((sum, value) => sum + value, 0) / 5) + step], `The middle value in the ordered list is ${median}.`);
  }

  if (mode === 21) {
    const repeated = randomInt(3, range);
    const values = shuffled([repeated, repeated, repeated, repeated + 1, repeated + 2, Math.max(1, repeated - 2)]);
    return numberQuestion(id, `What is the mode of ${values.join(', ')}?`, repeated, [repeated + 1, repeated + 2, Math.max(1, repeated - 2)], `${repeated} appears more often than any other value.`);
  }

  if (mode === 22) {
    const smaller = randomInt(2, range);
    const larger = smaller + randomInt(2, range);
    const answer = smaller - larger;
    return numberQuestion(id, `Calculate ${smaller} − ${larger}.`, answer, [larger - smaller, answer - 1, answer + larger], `Subtracting the larger number gives ${answer}.`);
  }

  if (mode === 23) {
    const a = randomInt(2, range);
    const b = randomInt(2, Math.max(4, Math.floor(range / 2)));
    const c = randomInt(2, Math.max(4, Math.floor(range / 2)));
    const answer = a + b * c;
    return numberQuestion(id, `Evaluate ${a} + ${b} × ${c}.`, answer, [(a + b) * c, a * b + c, answer + b], `Multiply first: ${b} × ${c} = ${b * c}; then add ${a} to get ${answer}.`);
  }

  if (mode === 24) {
    const base = randomInt(2, difficulty === 'hard' ? 6 : 4);
    const exponent = randomInt(2, difficulty === 'hard' ? 5 : 4);
    const answer = base ** exponent;
    return numberQuestion(id, `What is ${base}^${exponent}?`, answer, [base * exponent, base ** (exponent - 1), answer + base], `${base} multiplied by itself ${exponent} times equals ${answer}.`);
  }

  if (mode === 25) {
    const radius = randomInt(1, difficulty === 'hard' ? 8 : 5) * 7;
    const circumference = 2 * 22 / 7 * radius;
    return numberQuestion(id, `Using π = 22/7, find the circumference of a circle with radius ${radius}.`, circumference, [22 / 7 * radius, radius * radius, circumference + radius], `Circumference = 2πr = 2 × 22/7 × ${radius} = ${circumference}.`);
  }

  if (mode === 26) {
    const celsius = shuffled([0, 10, 20, 25, 30, 35, 40])[0];
    const fahrenheit = celsius * 9 / 5 + 32;
    return numberQuestion(id, `Convert ${celsius}°C to Fahrenheit.`, fahrenheit, [celsius + 32, celsius * 2, fahrenheit - 10], `F = C × 9/5 + 32 = ${fahrenheit}°F.`);
  }

  if (mode === 27) {
    const unitPrice = randomInt(2, difficulty === 'hard' ? 15 : 8);
    const firstQuantity = randomInt(2, 6);
    const secondQuantity = randomInt(7, difficulty === 'hard' ? 20 : 12);
    const firstCost = unitPrice * firstQuantity;
    const secondCost = unitPrice * secondQuantity;
    return numberQuestion(id, `${firstQuantity} notebooks cost $${firstCost}. At the same rate, what do ${secondQuantity} notebooks cost?`, secondCost, [firstCost + secondQuantity, unitPrice + secondQuantity, secondCost - unitPrice], `Each notebook costs $${unitPrice}; ${secondQuantity} cost $${secondCost}.`);
  }

  if (mode === 28) {
    const original = randomInt(2, difficulty === 'hard' ? 30 : 15) * 20;
    const increase = shuffled([10, 20, 25, 40, 50])[0];
    const updated = original + original * increase / 100;
    return numberQuestion(id, `A value of ${original} increases by ${increase}%. What is the new value?`, updated, [original * increase / 100, original + increase, updated - increase], `The increase is ${original * increase / 100}; adding it gives ${updated}.`);
  }

  const x1 = randomInt(-range, range);
  const distance = randomInt(2, range);
  const x2 = x1 + distance;
  const y = randomInt(-10, 10);
  return numberQuestion(id, `What is the distance between (${x1}, ${y}) and (${x2}, ${y})?`, distance, [Math.abs(x1 + x2), distance + 1, Math.abs(y)], `The y-coordinates match, so the distance is |${x2} − (${x1})| = ${distance}.`);
}

function generateMathQuestions(count, difficulty) {
  const questions = [];
  const prompts = new Set();
  const modes = shuffled(Array.from({ length: count }, (_, index) => index % 30));

  for (let index = 0; index < count; index += 1) {
    let question;
    do {
      question = generateMathQuestion(`q${index + 1}`, modes[index], difficulty);
    } while (prompts.has(question.prompt));
    prompts.add(question.prompt);
    questions.push(question);
  }

  return questions;
}

function generateBankQuestions(source, count) {
  const questions = [];
  while (questions.length < count) {
    const batch = shuffled(source);
    for (const [prompt, answers, correctOptionId, explanation] of batch) {
      if (questions.length >= count) break;
      const correctText = answers[OPTION_IDS.indexOf(correctOptionId)];
      const options = shuffled(answers).map((text, index) => ({ id: OPTION_IDS[index], text }));
      questions.push({
        id: `q${questions.length + 1}`,
        prompt,
        options,
        correctOptionId: options.find((option) => option.text === correctText).id,
        explanation,
      });
    }
  }
  return questions;
}

/** Random offline fallback that produces a fresh test on every request. */
export function generateDemoQuestionSet({ topic = 'mathematics', examType = 'general', difficulty = 'medium', count = 10 }) {
  const key = String(topic).trim().toLowerCase();
  const exam = String(examType).trim().toLowerCase();
  const examBank = EXAM_BANKS[`${exam}:${key}`];

  let questions;
  if (examBank) {
    questions = generateBankQuestions(examBank, count);
  } else if ((exam === 'gre' && key === 'quantitative reasoning') || (exam === 'sat' && key === 'math') || key === 'mathematics') {
    questions = generateMathQuestions(count, difficulty);
  } else {
    const source = BANK[key] || BANK.english;
    questions = generateBankQuestions(source, count);
  }

  return { topic: String(topic).trim() || title(key), difficulty, questions };
}
