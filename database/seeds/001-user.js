exports.seed = async function(knex) {
	await knex("users").truncate()
	await knex("users").insert([
		{ username: "james", password: "abc123"},
		{ username: "mike", password: "wasd54" },
		{ username: "tevin", password: "cba321"},
		{ username: "rae", password: "987zyx"},
	])
}