INSERT INTO cause (title, description) VALUES ("Environment Protection", "Protecting the Environment");
INSERT INTO cause (title, description) VALUES ("Economic Justice", "Fair pay, fair working conditions");
INSERT INTO cause (title, description) VALUES ("Healthcare Reform", "Fixing America's broken healthcare system");
INSERT INTO cause (title, description) VALUES ("LGBTQ+ Rights", "Protecting all sexual orientations and genders");
INSERT INTO cause (title, description) VALUES ("Racial Justice", "Removing structural racism");
INSERT INTO cause (title, description) VALUES ("Criminal Justice Reform", "Reforming criminal justice");

INSERT INTO actionType (title, description) VALUES ("Phone Bank", "");
INSERT INTO actionType (title, description) VALUES ("Text Bank", "");
INSERT INTO actionType (title, description) VALUES ("Write Letters", "");
INSERT INTO actionType (title, description) VALUES ("Share on Social Media", "");
INSERT INTO actionType (title, description) VALUES ("March", "");
INSERT INTO actionType (title, description) VALUES ("Donate", "");
INSERT INTO actionType (title, description) VALUES ("Coordinate", "");
INSERT INTO actionType (title, description) VALUES ("Petition", "");

INSERT INTO organization (contact, title, description, url) VALUES("contactperson@example.com", "ACLU", "The American Civil Liberties Union was founded in 1920 and is our nation's guardian of liberty. The ACLU works in the courts, legislatures and communities to defend and preserve the individual rights and liberties guaranteed to all people in this country by the Constitution and laws of the United States.", "https://www.aclu.org/");
INSERT INTO organization (contact, title, description, url) VALUES("contactperson@example.com", "The Sentencing Project", "Mission: The Sentencing Project works for a fair and effective U.S. criminal justice system by producing groundbreaking research to promote reforms in sentencing policy, address unjust racial disparities and practices, and to advocate for alternatives to incarceration. As a result of The Sentencing Project’s 34 years of research, publications, and advocacy, many people know that this country is the world’s leader in incarceration; that racial disparities pervade the criminal justice system; that over six million Americans can’t vote because of felony convictions; and that thousands of women and children have lost food stamps and cash assistance as the result of convictions for drug offenses.", "https://www.sentencingproject.org/");
INSERT INTO organization (contact, title, description, url) VALUES("contactperson@example.com", "Agriculture Fairness Alliance", "The Agriculture Fairness Alliance advocates for fairness in US agriculture policy and laws, in order to benefit farmers who practice non-exploitative and sustainable farming practices, to benefit animals, to benefit consumers, and to benefit the environment.", "https://www.agriculturefairnessalliance.org/");
INSERT INTO organization (contact, title, description, url) VALUES("contactperson@example.com", "Natural Resources Defense Council", "NRDC works to safeguard the earth—its people, its plants and animals, and the natural systems on which all life depends. We combine the power of more than three million members and online activists with the expertise of some 700 scientists, lawyers, and policy advocates across the globe to ensure the rights of all people to the air, the water, and the wild.", "https://www.nrdc.org/");
INSERT INTO organization (contact, title, description, url) VALUES("contactperson@example.com", "Access Fund", "At Access Fund, we are on a mission to keep climbing areas open and conserve the climbing environment, and we want you to join us. No one loves our climbing landscapes and the experiences they offer quite the same way that climbers do. But we must be willing and committed to fight for them. Not just for access, but for the integrity of these amazing places. As our sport continues to grow in popularity, overcrowding is stressing our outdoor landscapes beyond their ability to recover naturally. This not only threatens access, but it degrades the climbing experience that we hold so dear. We are a community of climbing advocates who love our climbing landscapes and the experiences they offer—and we are willing and committed to fight for them.", "https://www.accessfund.org/");
INSERT INTO organization (contact, title, description, url) VALUES("contactperson@example.com", "350", "We're an international movement of ordinary people working to end the age of fossil fuels and build a world of community-led renewable energy for all. Here's how we get there: 1. A fast & just transition to 100% renewable energy for all. 2. No new fossil fuel projects anywhere. 3. Not a penny more for dirty energy", "https://www.350.org/");

INSERT INTO organizationCause (organizationId, causeId) VALUES(
	(SELECT organizationId from organization WHERE title = "Agriculture Fairness Alliance"),
	(SELECT causeId from cause WHERE title = "Environment Protection"));
INSERT INTO organizationCause (organizationId, causeId) VALUES(
	(SELECT organizationId from organization WHERE title = "Natural Resources Defense Council"),
	(SELECT causeId from cause WHERE title = "Environment Protection"));
INSERT INTO organizationCause (organizationId, causeId) VALUES(
	(SELECT organizationId from organization WHERE title = "Access Fund"),
	(SELECT causeId from cause WHERE title = "Environment Protection"));
INSERT INTO organizationCause (organizationId, causeId) VALUES(
	(SELECT organizationId from organization WHERE title = "350"),
	(SELECT causeId from cause WHERE title = "Environment Protection"));
INSERT INTO organizationCause (organizationId, causeId) VALUES(
	(SELECT organizationId from organization WHERE title = "ACLU"),
	(SELECT causeId from cause WHERE title = "Racial Justice"));
INSERT INTO organizationCause (organizationId, causeId) VALUES(
	(SELECT organizationId from organization WHERE title = "The Sentencing Project"),
	(SELECT causeId from cause WHERE title = "Criminal Justice Reform"));

INSERT INTO campaign (organizationId, title, description) VALUES(
	(SELECT organizationId from organization WHERE title = "ACLU"),
	"End Cash Bail",
	"This is a longform description of the campaign. Campaigns have specific goals, like passing legislation, electing a candidate, or bringing about some change. Campaigns have associated Acitons, which are specific items that a user can do. Campaigns are also associated with organizations, which sponsor the campaign.");
INSERT INTO campaign (organizationId, title, description) VALUES(
	(SELECT organizationId from organization WHERE title = "ACLU"),
	"Stop Mass Deportation Programs",
	"This is a longform description of the campaign. Campaigns have specific goals, like passing legislation, electing a candidate, or bringing about some change. Campaigns have associated Acitons, which are specific items that a user can do. Campaigns are also associated with organizations, which sponsor the campaign.");
INSERT INTO campaign (organizationId, title, description) VALUES(
	(SELECT organizationId from organization WHERE title = "The Sentencing Project"),
	"End Felony Disenfranchisement",
	"This is a longform description of the campaign. Campaigns have specific goals, like passing legislation, electing a candidate, or bringing about some change. Campaigns have associated Acitons, which are specific items that a user can do. Campaigns are also associated with organizations, which sponsor the campaign.");
INSERT INTO campaign (organizationId, title, description) VALUES(
	(SELECT organizationId from organization WHERE title = "The Sentencing Project"),
	"Sentencing Reform",
	"This is a longform description of the campaign. Campaigns have specific goals, like passing legislation, electing a candidate, or bringing about some change. Campaigns have associated Acitons, which are specific items that a user can do. Campaigns are also associated with organizations, which sponsor the campaign.");
INSERT INTO campaign (organizationId, title, description) VALUES(
	(SELECT organizationId from organization WHERE title = "Agriculture Fairness Alliance"),
	"End Animal Agriculture Subsidies",
	"This is a longform description of the campaign. Campaigns have specific goals, like passing legislation, electing a candidate, or bringing about some change. Campaigns have associated Acitons, which are specific items that a user can do. Campaigns are also associated with organizations, which sponsor the campaign.");
INSERT INTO campaign (organizationId, title, description) VALUES(
	(SELECT organizationId from organization WHERE title = "Natural Resources Defense Council"),
	"Green New Deal",
	"This is a longform description of the campaign. Campaigns have specific goals, like passing legislation, electing a candidate, or bringing about some change. Campaigns have associated Acitons, which are specific items that a user can do. Campaigns are also associated with organizations, which sponsor the campaign.");
INSERT INTO campaign (organizationId, title, description) VALUES(
	(SELECT organizationId from organization WHERE title = "Natural Resources Defense Council"),
	"Transition from Fossil Fuels",
	"This is a longform description of the campaign. Campaigns have specific goals, like passing legislation, electing a candidate, or bringing about some change. Campaigns have associated Acitons, which are specific items that a user can do. Campaigns are also associated with organizations, which sponsor the campaign.");
INSERT INTO campaign (organizationId, title, description) VALUES(
	(SELECT organizationId from organization WHERE title = "Access Fund"),
	"Reform Mining and Mineral Leasing Laws",
	"This is a longform description of the campaign. Campaigns have specific goals, like passing legislation, electing a candidate, or bringing about some change. Campaigns have associated Acitons, which are specific items that a user can do. Campaigns are also associated with organizations, which sponsor the campaign.");
INSERT INTO campaign (organizationId, title, description) VALUES(
	(SELECT organizationId from organization WHERE title = "350"),
	"Covid-19 Impacts",
	"This is a longform description of the campaign. Campaigns have specific goals, like passing legislation, electing a candidate, or bringing about some change. Campaigns have associated Acitons, which are specific items that a user can do. Campaigns are also associated with organizations, which sponsor the campaign.");



INSERT INTO campaignCause (campaignId, causeId) VALUES(
	(SELECT campaignId from campaign WHERE title = "End Cash Bail"),
	(SELECT causeId from cause WHERE title = "Criminal Justice Reform"));
INSERT INTO campaignCause (campaignId, causeId) VALUES(
	(SELECT campaignId from campaign WHERE title = "Stop Mass Deportation Programs"),
	(SELECT causeId from cause WHERE title = "Criminal Justice Reform"));
INSERT INTO campaignCause (campaignId, causeId) VALUES(
	(SELECT campaignId from campaign WHERE title = "End Felony Disenfranchisement"),
	(SELECT causeId from cause WHERE title = "Criminal Justice Reform"));
INSERT INTO campaignCause (campaignId, causeId) VALUES(
	(SELECT campaignId from campaign WHERE title = "Sentencing Reform"),
	(SELECT causeId from cause WHERE title = "Criminal Justice Reform"));
INSERT INTO campaignCause (campaignId, causeId) VALUES(
	(SELECT campaignId from campaign WHERE title = "End Animal Agriculture Subsidies"),
	(SELECT causeId from cause WHERE title = "Environment Protection"));
INSERT INTO campaignCause (campaignId, causeId) VALUES(
	(SELECT campaignId from campaign WHERE title = "Green New Deal"),
	(SELECT causeId from cause WHERE title = "Environment Protection"));
INSERT INTO campaignCause (campaignId, causeId) VALUES(
	(SELECT campaignId from campaign WHERE title = "Transition from Fossil Fuels"),
	(SELECT causeId from cause WHERE title = "Environment Protection"));
INSERT INTO campaignCause (campaignId, causeId) VALUES(
	(SELECT campaignId from campaign WHERE title = "Reform Mining and Mineral Leasing Laws"),
	(SELECT causeId from cause WHERE title = "Environment Protection"));
INSERT INTO campaignCause (campaignId, causeId) VALUES(
	(SELECT campaignId from campaign WHERE title = "Covid-19 Impacts"),
	(SELECT causeId from cause WHERE title = "Environment Protection"));

INSERT INTO action (actionTypeId, campaignId, title, description, reward, url) VALUES(
	(SELECT actionTypeID FROM actionType WHERE title = "Write Letters"),
	(SELECT campaignId from campaign WHERE title = "End Cash Bail"),
	"Demand the end of the Racist Bail Industry",
	"Every year in the United States, millions of people must choose to pay cash bail after their arrest or face incarceration before they ever get a trial. If you can’t afford to make bail, you can either sit in jail or pay a non-refundable fee to a for-profit bail bonds company. Private insurance corporations are keeping this exploitative system alive – fueling mass incarceration and disproportionately harming Black and low-income communities. And the largest investor in this predatory industry is Canadian-based Fairfax Financial Holdings Ltd. It’s time to tell them to stop: Send this message to its CEO and chairman Prem Watsa today.",
	50,
	"https://action.aclu.org/send-message/prem-watsa-exit-racist-bail-industry?ms=wwwactionpage&initms=wwwactionpage&ms_aff=nat&initms_aff=nat&ms_chan=web&initms_chan=web");
INSERT INTO action (actionTypeId, campaignId, title, description, reward, url) VALUES(
	(SELECT actionTypeID FROM actionType WHERE title = "Write Letters"),
	(SELECT campaignId from campaign WHERE title = "Stop Mass Deportation Programs"),
	"Tell Congress to Divest from ICE and CBP",
	"An unprecedented amount of our taxpayer dollars gets funneled to U.S. Immigration and Customs Enforcement (ICE) and U.S. Customs and Border Protection (CBP) to carry out Trump’s anti-immigrant agenda. Congress must act. These rogue agencies have a long history of abuse, violence, and human rights violations – from separation of families to shutting out asylum seekers to raids in our communities. The events of 2020 have only exacerbated matters. CBP agents have been deployed against Black Lives Matter protesters, and horrific accounts of abuse, inadequate COVID-19 precautions, and deaths are being reported in detention centers nationwide. This must stop: Send a message to Congress to divest from ICE and CBP now.",
	50,
	"https://action.aclu.org/send-message/congress-divest-ice-and-cbp?ms=wwwactionpage&initms=wwwactionpage&ms_aff=NAT&initms_aff=NAT&ms_chan=web&initms_chan=web");
INSERT INTO action (actionTypeId, campaignId, title, description, reward, url) VALUES(
	(SELECT actionTypeID FROM actionType WHERE title = "Petition"),
	(SELECT campaignId from campaign WHERE title = "End Felony Disenfranchisement"),
	"Support Voting Rights for All People",
	"In 2020, 5.2 million people – 1 of every 44 adults – cannot vote because of laws that restrict voting by people with felony convictions. As mass incarceration accelerated in the United States, and the criminal legal system entangled larger numbers of people, our democracy has been gravely impacted. We need your support! Communities across the nation are acting now to end laws that restrict voting due to a criminal conviction. Sign the Petition!",
	25,
	"https://www.sentencingproject.org/actions/join-the-sentencing-project-in-restoring-voting-rights-to-all-people/");
INSERT INTO action (actionTypeId, campaignId, title, description, reward, url) VALUES(
	(SELECT actionTypeID FROM actionType WHERE title = "Write Letters"),
	(SELECT campaignId from campaign WHERE title = "Sentencing Reform"),
	"Ask Congress to support the Second Look Act",
	"U.S. Senator Cory Booker and U.S. House Representative Karen Bass have introduced bicameral legislation to create a sentence review procedure for people serving sentences longer than ten years in federal prison. Inspired by the cases of Matthew Charles and William Underwood, the Second Look Act of 2019 would appoint federal judges to consider petitions for sentence reduction after a person has served at least 10 years. The court must find that the person is not a danger to the safety of any person or the community; they demonstrate readiness for reentry; and the interests of justice warrant a sentence modification. A second look at these long sentences is essential to account for the personal changes that people make over time, and to preserve public resources for effective crime prevention.",
	50,
	"https://www.sentencingproject.org/actions/ask-congress-support-second-look-act/");
INSERT INTO action (actionTypeId, campaignId, title, description, reward, url) VALUES(
	(SELECT actionTypeID FROM actionType WHERE title = "Write Letters"),
	(SELECT campaignId from campaign WHERE title = "End Animal Agriculture Subsidies"),
	"Break up Agribusiness Monopolies",
	"United States Senator Cory Booker (D-NJ) has proposed legislation to promote sweeping reform on America’s food and agriculture system. The Farm System Reform Act of 2019 (FSRA) would phase out large concentrated animal feeding operations (CAFOs) by 2040 while propping up independent farmers, promoting public health, and protecting the environment. To accelerate this process, Agriculture Fairness Alliance (AFA) proposes one more provision: ending CAFO subsidies by 2030.",
	50,
	"https://www.agriculturefairnessalliance.org/news/send-letter-to-rep/");
INSERT INTO action (actionTypeId, campaignId, title, description, reward, url) VALUES(
	(SELECT actionTypeID FROM actionType WHERE title = "Write Letters"),
	(SELECT campaignId from campaign WHERE title = "Green New Deal"),
	"Congress: We Demand New Action On Climate!",
	"The Green New Deal resolution and its strong call for climate action have generated undeniable enthusiasm for climate action across the country. We must make sure climate change is this new Congress’s top priority. Urge your senators and representative to use their power to protect our air, water, and lands from President Trump’s attacks, expand our clean energy economy, and avert climate catastrophe — or risk being left behind on the wrong side of history.",
	50,
	"https://act.nrdc.org/letter/congress-climate-100110?source=WBSCLIPET");
INSERT INTO action (actionTypeId, campaignId, title, description, reward, url) VALUES(
	(SELECT actionTypeID FROM actionType WHERE title = "Write Letters"),
	(SELECT campaignId from campaign WHERE title = "Transition from Fossil Fuels"),
	"Congress: No Offshore Drilling Plan",
	"In yet another handout to the oil industry, President Trump and his Interior Department are preparing a dangerous new offshore drilling plan that would auction off huge swaths of our coasts to oil and gas companies. This outrageous scheme could put drill rigs in the waters off nearly every coastal state, endanger our coastal communities and marine life with the threat of catastrophic oil spills, and keep us shackled to the climate-busting fossil fuels of the past. Tell Congress that you oppose Trump’s reckless plan and want to protect our coasts and oceans from dirty, reckless oil and gas drilling! Make your voice heard now!",
	50,
	"https://act.nrdc.org/letter/ocs-offshore-180123?source=WBSOCSPET");
INSERT INTO action (actionTypeId, campaignId, title, description, reward, url) VALUES(
	(SELECT actionTypeID FROM actionType WHERE title = "Write Letters"),
	(SELECT campaignId from campaign WHERE title = "Reform Mining and Mineral Leasing Laws"),
	"Reform Mining and Mineral Leasing Laws",
	"Last month, we pushed back against a Bureau of Land Management (BLM) auction that aimed to put more than 85,000 acres of recreation-rich lands around Moab, Utah, up for lease to oil and gas companies. The mineral leasing system for America’s public lands, which includes oil and gas development, gives the BLM broad discretion to determine when, where, and how to lease public lands. When combined with the presidential administration’s aggressive “energy dominance” agenda, this broad discretion is a recipe for disaster for public lands. Public lands are kept in trust for all Americans, and it is critical that all values—including recreation, conservation, and cultural resources—are considered before decisions are made to lease public land to private industry. Instead of taking a balanced approach to energy development, the administration has implemented policy changes that allow them to fast-track leasing, bypass environmental reviews, diminish local stakeholder concerns, and ignore the conservation and recreation values of public lands. It is time for Congress to step in and reform the laws that allow the BLM broad discretion to mine and lease our favorite climbing, biking, hiking, and camping areas. Please take 5 minutes to write to your congressional representatives and tell them to reform the Mineral Leasing Act of 1920 and the General Mining Act of 1872. These antiquated laws no longer serve our cherished public lands and they must be updated.",
	50,
	"https://www.accessfund.org/take-action/campaigns/mining-and-mineral-leasing-reform");
INSERT INTO action (actionTypeId, campaignId, title, description, reward, url) VALUES(
	(SELECT actionTypeID FROM actionType WHERE title = "Petition"),
	(SELECT campaignId from campaign WHERE title = "Covid-19 Impacts"),
	"Open Letter: Principles for a #JustRecovery",
	"We, the undersigned, call for a united global response to this COVID-19 pandemic that ensures a just recovery and transition to a better future for those most in need in the wake of this crisis. Responses at every level must uphold these five principles: Put people’s health first, no exceptions. Provide economic relief directly to the people. Help our workers and communities, not corporate executives. Create resilience for future crises. Build solidarity and community across borders – do not empower authoritarians.",
	25,
	"https://350.org/just-recovery/#signletter");

UPDATE action set liveDT = NOW() - INTERVAL 1 DAY;
UPDATE action set expireDT = NOW() + INTERVAL 20 DAY;

INSERT INTO level (levelNumber, expRequired) VALUES(1,0);
INSERT INTO level (levelNumber, expRequired) VALUES(2,100);
INSERT INTO level (levelNumber, expRequired) VALUES(3,200);
INSERT INTO level (levelNumber, expRequired) VALUES(4,300);
INSERT INTO level (levelNumber, expRequired) VALUES(5,500);
INSERT INTO level (levelNumber, expRequired) VALUES(6,800);
INSERT INTO level (levelNumber, expRequired) VALUES(7,1300);
INSERT INTO level (levelNumber, expRequired) VALUES(8,2100);
INSERT INTO level (levelNumber, expRequired) VALUES(9,3400);
INSERT INTO level (levelNumber, expRequired) VALUES(10,5500);
INSERT INTO level (levelNumber, expRequired) VALUES(11,8900);
INSERT INTO level (levelNumber, expRequired) VALUES(12,14400);
INSERT INTO level (levelNumber, expRequired) VALUES(13,23300);
INSERT INTO level (levelNumber, expRequired) VALUES(14,37700);
INSERT INTO level (levelNumber, expRequired) VALUES(15,61000);
