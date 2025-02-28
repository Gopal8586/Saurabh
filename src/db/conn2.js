mongoose.connect('mongodb+srv://gopalharsh8586:Gopal%4099190@vegbitedb.d3mwr.mongodb.net/?retryWrites=true&w=majority&appName=vegbitedb', {
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));