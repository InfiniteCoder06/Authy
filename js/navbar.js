const nav_bar_change = () => {
	const side_panel = document.getElementById("sidePanel");

	const buttonLabels = [
		"Marks",
		"Class Attendance",
		"Course Page",
		"Digital Assignment Upload",
		"Time Table",
		"Calendar"
	];

	const buttonIndices = {};

	if(side_panel) {
		const items_list = Array.from(side_panel.getElementsByTagName("a"))
		.filter(e => e.dataset.url);

		items_list.forEach((item, index) => {
			const itemText = item.innerText.trim();
			buttonLabels.forEach(label => {
				if (itemText.includes(label)) {
					buttonIndices[label] = index;
				}
			});
		});
	}

	const nav = document.getElementsByClassName("collapse navbar-collapse")[0];
	const span = document.createElement("div");
	span.id = "navbar";

	buttonLabels.forEach(label => {
		if (buttonIndices[label] !== undefined) {
			span.innerHTML += `
                <button class="btn btn-primary border-primary shadow-none" 
                        type="button" 
                        style="background: rgba(13,110,253,0); border-style: none;" 
                        onclick="Array.from(document.getElementById('sidePanel').getElementsByTagName('a')).filter(e => e.dataset.url)[${buttonIndices[label]}].click();" 
                        id="nav_short">
						${label}
				</button>
            `;
		}
	});

	nav.insertBefore(span, nav.children[0]);

	const buttons = document.querySelectorAll("#nav_short");
	buttons.forEach(button => {
		button.addEventListener("click", () => {
			buttons.forEach(but => {
				but.disabled = true;
				setTimeout(() => {
					but.disabled = false;
				}, 1500);
			});
		});
	});

	const btnColor = document.getElementById("sidePanel");
	if(btnColor) {
		btnColor.classList.remove("btnBarColor")
	}
};

const clear_navbar = () => {
	const navbar = document.getElementById("navbar");
	if (navbar) navbar.remove();
};

chrome.runtime.onMessage.addListener((request) => {
	if (request.message === "nav_bar_change") {
		const btnGroup = document.getElementsByClassName("btn-group dropend")[0];
		if (btnGroup && btnGroup.style.backgroundColor === "red") {
			btnGroup.remove();
		}

		if (document.getElementsByClassName("btn btn-primary border-primary shadow-none").length === 0) {
			nav_bar_change();
		}
	}
});

if (document.getElementsByClassName("btn-group dropend")[0]?.style.backgroundColor === "red") {
	document.getElementsByClassName("btn-group dropend")[0].remove();
}

if (document.getElementsByClassName("btn btn-primary border-primary shadow-none").length === 0) {
	window.addEventListener("load", nav_bar_change, false);
}
