/**
 * Cleans and returns a player Tag
 * @param {String} tag - The player tag to clean
 */
async function getTag(tag: String) {
	return tag.toUpperCase().replace(/#/g, '').replace(/O/g, '0');
}

export default getTag