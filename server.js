import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app
	.route("/bfhl")
	.get((req, res) => {
		res.json({ operation_code: 1 });
	})
	.post((req, res) => {
		try {
			const { data } = req.body;

			const numbers = data.filter((item) => !isNaN(item));
			const alphabets = data.filter((item) => /^[A-Za-z]$/.test(item));

			const highestAlphabet = findHighestAlphabet(alphabets);

			const user_id = createUserIdentifier("john_doe_17091999");
			const email = "john@xyz.com";
			const roll_number = "ABCD123";

			res.json({
				is_success: true,
				user_id,
				email,
				roll_number,
				numbers,
				alphabets,
				highest_alphabet: [highestAlphabet],
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Internal server error" });
		}
	});

function createUserIdentifier(fullName) {
	return `${fullName.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "")}`;
}

function findHighestAlphabet(alphabets) {
	return alphabets.reduce((highest, current) => {
		return current.toLowerCase() > highest.toLowerCase() ? current : highest;
	}, "A");
}

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
