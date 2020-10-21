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

INSERT INTO organization (contact, title, description) VALUES("contactperson@example.com", "Environmental Action Group", "This is a longer description about what the organization does, including when it was founded, what it's values are, and potentially why we've selected them as a good target. It likely is populated from the about us page on the organization's website.");
INSERT INTO organization (contact, title, description) VALUES("contactperson@example.com", "HealthReform", "This is a longer description about what the organization does, including when it was founded, what it's values are, and potentially why we've selected them as a good target. It likely is populated from the about us page on the organization's website.");
INSERT INTO organization (contact, title, description) VALUES("contactperson@example.com", "Crim Roberts for Senator", "This is a longer description about what the organization does, including when it was founded, what it's values are, and potentially why we've selected them as a good target. It likely is populated from the about us page on the organization's website.");
INSERT INTO organization (contact, title, description) VALUES("contactperson@example.com", "TransRights", "This is a longer description about what the organization does, including when it was founded, what it's values are, and potentially why we've selected them as a good target. It likely is populated from the about us page on the organization's website.");
INSERT INTO organization (contact, title, description) VALUES("contactperson@example.com", "BLM Seattle", "This is a longer description about what the organization does, including when it was founded, what it's values are, and potentially why we've selected them as a good target. It likely is populated from the about us page on the organization's website.");
INSERT INTO organization (contact, title, description) VALUES("contactperson@example.com", "Innocence Proj", "This is a longer description about what the organization does, including when it was founded, what it's values are, and potentially why we've selected them as a good target. It likely is populated from the about us page on the organization's website.");

INSERT INTO organizationCause (organizationId, causeId) VALUES(
	(SELECT organizationId from organization WHERE title = "Environmental Action Group"),
	(SELECT causeId from cause WHERE title = "Environment Protection"));
INSERT INTO organizationCause (organizationId, causeId) VALUES(
	(SELECT organizationId from organization WHERE title = "HealthReform"),
	(SELECT causeId from cause WHERE title = "Healthcare Reform"));
INSERT INTO organizationCause (organizationId, causeId) VALUES(
	(SELECT organizationId from organization WHERE title = "Crim Roberts for Senator"),
	(SELECT causeId from cause WHERE title = "Economic Justice"));
INSERT INTO organizationCause (organizationId, causeId) VALUES(
	(SELECT organizationId from organization WHERE title = "TransRights"),
	(SELECT causeId from cause WHERE title = "LGBTQ+ Rights"));
INSERT INTO organizationCause (organizationId, causeId) VALUES(
	(SELECT organizationId from organization WHERE title = "BLM Seattle"),
	(SELECT causeId from cause WHERE title = "Racial Justice"));
INSERT INTO organizationCause (organizationId, causeId) VALUES(
	(SELECT organizationId from organization WHERE title = "Innocence Proj"),
	(SELECT causeId from cause WHERE title = "Criminal Justice Reform"));

INSERT INTO campaign (organizationId, title, description) VALUES(
	(SELECT organizationId from organization WHERE title = "Environmental Action Group"),
	"Pass bill 1920202!",
	"This is a longform description of the campaign. Campaigns have specific goals, like passing legislation, electing a candidate, or bringing about some change. Campaigns have associated Acitons, which are specific items that a user can do. Campaigns are also associated with organizations, which sponsor the campaign.");
INSERT INTO campaign (organizationId, title, description) VALUES(
	(SELECT organizationId from organization WHERE title = "HealthReform"),
	"Regulate health companies",
	"This is a longform description of the campaign. Campaigns have specific goals, like passing legislation, electing a candidate, or bringing about some change. Campaigns have associated Acitons, which are specific items that a user can do. Campaigns are also associated with organizations, which sponsor the campaign.");
INSERT INTO campaign (organizationId, title, description) VALUES(
	(SELECT organizationId from organization WHERE title = "Crim Roberts for Senator"),
	"Elect Crim Roberts!",
	"This is a longform description of the campaign. Campaigns have specific goals, like passing legislation, electing a candidate, or bringing about some change. Campaigns have associated Acitons, which are specific items that a user can do. Campaigns are also associated with organizations, which sponsor the campaign.");
INSERT INTO campaign (organizationId, title, description) VALUES(
	(SELECT organizationId from organization WHERE title = "TransRights"),
	"Stonewall Justice Initiative",
	"This is a longform description of the campaign. Campaigns have specific goals, like passing legislation, electing a candidate, or bringing about some change. Campaigns have associated Acitons, which are specific items that a user can do. Campaigns are also associated with organizations, which sponsor the campaign.");
INSERT INTO campaign (organizationId, title, description) VALUES(
	(SELECT organizationId from organization WHERE title = "BLM Seattle"),
	"Eliminate Redlining",
	"This is a longform description of the campaign. Campaigns have specific goals, like passing legislation, electing a candidate, or bringing about some change. Campaigns have associated Acitons, which are specific items that a user can do. Campaigns are also associated with organizations, which sponsor the campaign.");
INSERT INTO campaign (organizationId, title, description) VALUES(
	(SELECT organizationId from organization WHERE title = "Innocence Proj"),
	"Fund defense attorneys",
	"This is a longform description of the campaign. Campaigns have specific goals, like passing legislation, electing a candidate, or bringing about some change. Campaigns have associated Acitons, which are specific items that a user can do. Campaigns are also associated with organizations, which sponsor the campaign.");

INSERT INTO campaignCause (campaignId, causeId) VALUES(
	(SELECT campaignId from campaign WHERE title = "Pass bill 1920202!"),
	(SELECT causeId from cause WHERE title = "Environment Protection"));
INSERT INTO campaignCause (campaignId, causeId) VALUES(
	(SELECT campaignId from campaign WHERE title = "Regulate health companies"),
	(SELECT causeId from cause WHERE title = "Healthcare Reform"));
INSERT INTO campaignCause (campaignId, causeId) VALUES(
	(SELECT campaignId from campaign WHERE title = "Elect Crim Roberts!"),
	(SELECT causeId from cause WHERE title = "Economic Justice"));
INSERT INTO campaignCause (campaignId, causeId) VALUES(
	(SELECT campaignId from campaign WHERE title = "Stonewall Justice Initiative"),
	(SELECT causeId from cause WHERE title = "LGBTQ+ Rights"));
INSERT INTO campaignCause (campaignId, causeId) VALUES(
	(SELECT campaignId from campaign WHERE title = "Eliminate Redlining"),
	(SELECT causeId from cause WHERE title = "Racial Justice"));
INSERT INTO campaignCause (campaignId, causeId) VALUES(
	(SELECT campaignId from campaign WHERE title = "Fund defense attorneys"),
	(SELECT causeId from cause WHERE title = "Criminal Justice Reform"));


INSERT INTO action (actionTypeId, campaignId, title, description, reward) VALUES(
	(SELECT actionTypeID FROM actionType WHERE title = "Phone Bank"),
	(SELECT campaignId from campaign WHERE title = "Pass bill 1920202!"),
	"Phone bank to pass bill 1920202",
	"This is an Action description. An Action is a specific thing a user can do. It's associated with a campaign.",
	100);
INSERT INTO action (actionTypeId, campaignId, title, description, reward) VALUES(
	(SELECT actionTypeID FROM actionType WHERE title = "Text Bank"),
	(SELECT campaignId from campaign WHERE title = "Regulate health companies"),
	"Text bank to put pressure on health companies",
	"This is an Action description. An Action is a specific thing a user can do. It's associated with a campaign.",
	100);
INSERT INTO action (actionTypeId, campaignId, title, description, reward) VALUES(	
	(SELECT actionTypeID FROM actionType WHERE title = "Phone Bank"),
	(SELECT campaignId from campaign WHERE title = "Elect Crim Roberts!"),
	"Phone bank to help elect Crim Roberts",
	"This is an Action description. An Action is a specific thing a user can do. It's associated with a campaign.",
	100);
INSERT INTO action (actionTypeId, campaignId, title, description, reward) VALUES(	
	(SELECT actionTypeID FROM actionType WHERE title = "Write Letters"),
	(SELECT campaignId from campaign WHERE title = "Stonewall Justice Initiative"),
	"Write letters in support of Transrights",
	"This is an Action description. An Action is a specific thing a user can do. It's associated with a campaign.",
	100);
INSERT INTO action (actionTypeId, campaignId, title, description, reward) VALUES(	
	(SELECT actionTypeID FROM actionType WHERE title = "Share on Social Media"),
	(SELECT campaignId from campaign WHERE title = "Stonewall Justice Initiative"),
	"Share information aboubt X bill",
	"This is an Action description. An Action is a specific thing a user can do. It's associated with a campaign.",
	100);
INSERT INTO action (actionTypeId, campaignId, title, description, reward) VALUES(	
	(SELECT actionTypeID FROM actionType WHERE title = "March"),
	(SELECT campaignId from campaign WHERE title = "Eliminate Redlining"),
	"March to end redlining",
	"This is an Action description. An Action is a specific thing a user can do. It's associated with a campaign.",
	100);
INSERT INTO action (actionTypeId, campaignId, title, description, reward) VALUES(	
	(SELECT actionTypeID FROM actionType WHERE title = "Donate"),
	(SELECT campaignId from campaign WHERE title = "Fund defense attorneys"),
	"Donate to justice fund",
	"This is an Action description. An Action is a specific thing a user can do. It's associated with a campaign.",
	100);
INSERT INTO action (actionTypeId, campaignId, title, description, reward) VALUES(	
	(SELECT actionTypeID FROM actionType WHERE title = "Coordinate"),
	(SELECT campaignId from campaign WHERE title = "Fund defense attorneys"),
	"Help coordinate freeing wrongfully convicted",
	"This is an Action description. An Action is a specific thing a user can do. It's associated with a campaign.",
	100);
	
