<script lang="ts">
	import { page } from '$app/stores';

	export let txt = 'Upload Image';
	export let id = 'file';
	export let name = 'file';
	export let sending = false;

	const lang = 'es';

	let errMsg = '';
	let txtLazy: any;
	let txtLoaded = false;
	let labelTxt = '';
	let placeholder = '';
	let input: HTMLInputElement;
	let imgPreviewUrl = '';

	interface FetchResponse {
		success: boolean;
		msg?: string;
		status?: string; // Campo opcional para código de estado
		error?: any; // Campo opcional para error
	}

	// upload user img
	const handleUploadImg = async (e: Event) => {
		e.preventDefault();
		sending = true;
		errMsg = '';

		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		target.value = '';

		if (!file) {
			errMsg = txtLazy?.NO_FILE_SELECTED;
			return;
		}

		// create form data
		const formData = new FormData();
		formData.append('file', file);
		formData.append('lang', lang);

		// 	// send file to server
		const res = await fetch('/api/upload-image', {
			method: 'POST',
			body: formData
		});
		const data = await res.json();
		console.log('🚀 ~ data:', data);

		// error case
		if (!data?.success) {
			if (data?.msg) errMsg = data.msg;
			sending = false;
			return;
		}

		// success case
		// currentStep = 3;

		// display img uploaded
		imgPreviewUrl = URL.createObjectURL(file);

		// fileUploaded = true;
		sending = false;
	};
</script>

<img src="/uploads/primera-img.jpeg" alt="" />
<img src="/app/uploads/primera-img.jpeg" alt="" />
<img src="/app/uploads/primera-img.jpg" alt="" />
<img src="/uploads/primera-img.jpg" alt="" />

<div>
	<!-- todo display err msgs -->
	<!-- img to upload -->
	{#if imgPreviewUrl}
		<div class:hide={!imgPreviewUrl} class="img-uploaded-wrp">
			<img src={imgPreviewUrl} alt="" />
		</div>
	{/if}
	<!-- input file -->
	<form>
		<input on:change={handleUploadImg} class:sending type="file" {id} {name} accept="image/*" />
		<label for="file">
			<span class="btn">{txt} </span>
		</label>
		<!-- !display errors -->
		{#if errMsg}
			<p>
				{errMsg}
			</p>
		{/if}
	</form>
</div>

<style>
	img {
		max-width: 100%;
	}
</style>
