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
			const defaultUser = {
				user_id: "john_doe_17091999",
				email: "john@xyz.com",
				roll_number: "ABCD123",
			};
			const { data, user_id, email, roll_number } = req.body;

			if (user_id !== undefined) defaultUser.user_id = user_id;
			if (email !== undefined) defaultUser.email = email;
			if (roll_number !== undefined) defaultUser.roll_number = roll_number;

			const numbers = data.filter((item) => !isNaN(item));
			const alphabets = data.filter((item) => /^[A-Za-z]$/.test(item));

			const highestAlphabet = findHighestAlphabet(alphabets);

			res.json({
				is_success: true,
				user_id: defaultUser.user_id,
				email: defaultUser.email,
				roll_number: defaultUser.roll_number,
				numbers,
				alphabets,
				highest_alphabet: [highestAlphabet],
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Internal server error" });
		}
	});

function findHighestAlphabet(alphabets) {
	return alphabets.reduce((highest, current) => {
		return current.toLowerCase() > highest.toLowerCase() ? current : highest;
	}, "A");
}

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
