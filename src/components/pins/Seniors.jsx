function Seniors({ people, age, gender, status, purok }) {	return (
		<div class="max-w-sm p-6 bg-white">
			<img
				src="https://cdn-icons-png.flaticon.com/512/4441/4441163.png"
				alt=""
				className="w-14 h-14 rounded-full mb-4"
			/>
			<a href="#">
				<h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900">{people}(Senior)</h5>
			</a>
			<p class="font-normal text-gray-500">
				{age}, {gender}
			</p>
			<p class="mb-3 font-normal text-gray-500">
				<b>Status:</b> {status}, <b>Purok:</b> {purok}
			</p>
		</div>
	);
}

export default Seniors;
