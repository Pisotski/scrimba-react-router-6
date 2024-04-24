import "../assets/About.css";
import van from "../assets/about_image.jpg";

const About = () => {
	return (
		<>
			<div className="about wrapper">
				<div className="about-img header" />
				<section>
					<h2>Don't squeeze in a sedan when you could relax in a van</h2>
					<p>
						Our mission is to enliven your road trip with the prefect travel van
						rental. Our vans are recertified before each trip to ensure your
						tavel plans can go off without a hitch. (hitch costs extra{" "}
						<span role="img" aria-label="Smiling Face With Smiling Eyes">
							😊
						</span>
						)
					</p>
					<p>
						Our team is full of vanlife enthusiasts who know firsthand the magic
						of touring the world on 4 wheels.
					</p>
				</section>
				<section className="about-form-wrapper">
					<form className="black-button-standard">
						<label htmlFor="explore-our-vans">
							<strong>
								Your destination is waiting.
								<br /> You van is ready.
							</strong>
						</label>
						<button type="submit" id="explore-our-vans">
							Explore our vans
						</button>
					</form>
				</section>
			</div>
		</>
	);
};

export { About };
