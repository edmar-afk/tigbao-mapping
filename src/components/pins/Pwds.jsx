import React from "react";function Pwds({people, age, gender}) {
	return (
		<div class="max-w-sm p-6 bg-white">
			<img
				src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyisFm0d5rDYTIecUdcX_KuOkM4Cn6ldgpWg&s"
                alt=""
                className="w-14 h-14 rounded-full mb-4"
			/>
			<a href="#">
				<h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900">{people}(PWD)</h5>
			</a>
			<p class="mb-3 font-normal text-gray-500">
				{age}, {gender}
			</p>
		</div>
	);
}

export default Pwds;
