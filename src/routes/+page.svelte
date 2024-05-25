<script lang="ts">
	import { page } from '$app/stores';

	export let txt = 'Upload Image';
	export let hide = false;
	export let id = 'file';
	export let name = 'file';
	export let value = '';
	export let sending = false;
	export let disabled = false;
	export let block = true;
	export let fileUploaded = false;
	// export let small = false

	const lang = $page.data.lang;

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
	.img-uploaded-wrp {
		max-height: 20rem;
		overflow: hidden;
		border-radius: var(--br-card);
		margin-bottom: 1.5rem;
	}
	.img-uploaded-wrp.hide {
		display: none;
	}
	div.hide,
	input {
		display: none;
	}
	label {
		position: relative;
		display: block;
		cursor: pointer;
	}
	label > span {
		position: relative;
		display: block;
	}
	input.sending + label {
		pointer-events: none;
	}
</style>
