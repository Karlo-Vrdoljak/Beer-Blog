export function linkTest(value) {
	if (value) {
		return value.startsWith("http") || value.startsWith("data:image");
	}
	return true;
}
