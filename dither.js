(async () => {
	var path = require("path")
	var glob = require("glob")
	var gleech = require("gleech")

	var files = glob.sync("/**/*.@(png|jpg|jpeg|JPG)", {
		root: path.join(process.cwd(), '_site'),
		nosort: true,
	})
	
	Promise.all(files.map((path) => {
		return gleech.read(path, (err, image) => {
			console.log(path)
			return image.ditherBayer(1).pixelate(1).write(path)
		})
	}))
})()
