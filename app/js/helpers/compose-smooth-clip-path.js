const degreesToRadians = deg => deg * Math.PI / 180;

/**
 * @see https://medium.com/@zubryjs/squircles-bringing-ios-7s-solution-to-rounded-rectangles-to-css-9fc35779aa65
 */
export default function composeSmoothClipPath(radius) {
	const squircle =
		theta => ({
			x: Math.pow(Math.abs(Math.cos(theta)), 2 / radius) * 50 * Math.sign(Math.cos(theta)) + 50,
			y: Math.pow(Math.abs(Math.sin(theta)), 2 / radius) * 50 * Math.sign(Math.sin(theta)) + 50
		});

	return (new Array(90))
		.fill(0)
		.map((x, i) => 90 + i)
		.map(degreesToRadians)
		.map(squircle) // We'll use a border-radius of 4
		.map(({ x, y }) => ({ 
			x: Math.round(x * 10)/10, 
			y: Math.round(y * 10)/10 // Round to the ones place
		})) 
		.map(({ x, y }) => `${x}% ${y}%`)
		.join(', ');
}