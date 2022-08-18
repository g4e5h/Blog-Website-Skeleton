const express=require('express');
const bodyParser=require('body-parser');
const ejs=require('ejs');
const date=require(__dirname+'/date.js');
const texts=require(__dirname + "/randomTexts.js");
const mongoose=require('mongoose');

const app=express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

mongoose.connect("mongodb://localhost:27017/blogDB",{useNewUrlParser:true});

const postSchema={
    title:String,
    content:String,
    time:String
}

const Post=mongoose.model('Post',postSchema);

// const blogs=[];

app.get('/',function(req,res){
    Post.find({},function(err,blogs){
        if(!err)
        res.render('home',{blogs:blogs});
    })
})

app.post('/compose',function(req,res){
    // blogs.push({postTitle:req.body.postTitle ,postContent:req.body.postContent, postTime:date.date()});

    const post=new Post({title:req.body.postTitle, content:req.body.postContent, time:date.date()})
   
    post.save(function(err){
        if(!err)
        res.redirect('/');
    });
})


app.get('/about',function(req,res){
    res.render('about',{aboutText:texts.aboutContent});
});

app.get('/contact',function(req,res){
    res.render('contact',{contactText:texts.contactContent});
});

app.get('/compose',function(req,res){
res.render('compose');                  //form->post action=/
});

app.get('/post/:postID',function(req,res){
    let requiredPostID=req.params.postID;
    Post.findOne({_id:requiredPostID},function(err,post){
        if(!err)
        res.render('singularPost',{blog:post});
    })

    // const filteredObjArray=blogs.filter((eachBlogObject) =>{
    //     return eachBlogObject.postTitle === post;
    // });

    
});



app.listen(process.env.PORT || 3000 ,  function(){
    console.log("Blog website server is now running on assigned port...")
})