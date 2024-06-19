const Review = require("../models/Review.cjs");
const Van = require("../models/Van.cjs");
const User = require("../models/User.cjs");

const getRandomDateWithinTwoYears = () => {
	const now = new Date();
	const twoYearsAgo = new Date(now.setFullYear(now.getFullYear() - 2));
	const randomDate = new Date(
		twoYearsAgo.getTime() + Math.random() * (Date.now() - twoYearsAgo.getTime())
	);
	return randomDate;
};

const generateText = () => {
	const reviewTexts = [
		"I was pleasantly surprised by the quality of service provided by this company. The staff was friendly and professional, and they went above and beyond to ensure that my needs were met. I highly recommend them to anyone in need of their services.",
		"While the product itself was satisfactory, I found the customer service to be lacking. There were delays in communication and it took longer than expected to resolve issues. Overall, an average experience.",
		"I had a fantastic experience with this company. The product exceeded my expectations, and the customer service was top-notch. I will definitely be a returning customer and will recommend them to all my friends and family.",
		"Unfortunately, I was not impressed with the product I received. It did not meet the specifications outlined on the website, and there were issues with functionality. The customer service was responsive but unable to fully resolve my concerns.",
		"I can't say enough good things about this company. The product was exactly what I was looking for, and the customer service was exceptional. I will be a loyal customer for years to come.",
	];
	return reviewTexts[Math.floor(Math.random() * reviewTexts.length)];
};

function getRandomElement(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

const generateReviews = async (userId) => {
	try {
		const [users, vans, owner] = await Promise.all([
			User.find({ _id: { $ne: userId } }),
			Van.find({}),
			User.findById(userId),
		]);

		let reviewsToSave = [];

		for (const van of vans) {
			const numberOfReviews = Math.floor(Math.random() * 11) + 15;
			for (let i = 0; i < numberOfReviews; i++) {
				const guest = getRandomElement(users);
				const createdBy = guest._id;
				const guestName = guest.name;
				const review = new Review({
					createdBy,
					owner: owner._id,
					van: van._id,
					guestName,
					date: getRandomDateWithinTwoYears(),
					reviewText: generateText(),
					score: Math.floor(Math.random() * 5) + 1,
				});
				reviewsToSave.push(review);
			}
		}

		await Review.insertMany(reviewsToSave);
		console.log(`Successfully saved ${reviewsToSave.length} reviews`);
	} catch (error) {
		console.error("Error generating reviews:", error);
	}
};

module.exports = { generateReviews };
