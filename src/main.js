class Blog {
	constructor(){
		console.log('Blog is started!');
		this.setInit();
		this.registerEvents();
		this.likedSet = new Set();
	}
	setInit(){
		this.blogList = document.querySelector(".blogList > ul");
	}
	registerEvents(){
		const dataURL = "/data/data.json";
		const startBtn = document.querySelector(".start");
		
		startBtn.addEventListener("click",() =>{
			this.setInitData(dataURL);
		});
		this.blogList.addEventListener("click",({target}) =>{
			const targetClassName = target.className;
			if(targetClassName !== "like" && targetClassName !== "unlike")	return;
			const postTitle = target.previousElementSibling.textContent;
			// console.log('선택한 블로그 제목',postTitle);
			//찜 취소를 클릭한 경우 찜하기로 다시 변경하고 찜목록을 재고하고, 찜목록뷰 렌더링
			if(targetClassName === "unlike"){
				target.className = "like";
				target.innerText = "찜하기";	
				this.likedSet.delete(postTitle);			
			}else{
				//찜 목록에 추가
				this.likedSet.add(postTitle);
				//찜 된 목록(div)
				target.className = "unlike";
				target.innerText = "찜취소";
			}
			//내 찜 목록 뷰에 추가
			this.updateLikedList();
		});		
	}
	updateLikedList() {
		const ul = document.querySelector(".like-list > ul");
		let likedSum = "";

		this.likedSet.forEach( (v) =>{
			likedSum+=`<li> ${v} </li>`;
		})
		ul.innerHTML = likedSum;
	}

	setInitData(dataURL){
		this.getData(dataURL,this.insertPosts.bind(this));
	}
	getData(dataURL, fn){
		const oReq = new XMLHttpRequest();
		oReq.addEventListener("load",()=>{
			const list =JSON.parse(oReq.responseText).body;
			fn(list);
		});
		oReq.open('GET',dataURL);
		oReq.send();
	}
	insertPosts(list){

		list.forEach((v) =>{
			this.blogList.innerHTML += `
			<li>
			   <a href=${v.link}> ${v.title}</a>
			   <div class="like">찜하기</div>
		    </li>
		    `;
		})
	}
}

export default Blog;