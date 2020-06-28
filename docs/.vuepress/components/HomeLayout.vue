<template>
    <div class="custom-page-class">
        <main class="main-content">
            <div class="card-wrapper">

            </div>
        </main>
    </div>
</template>

<script>
export default {
    name: "home-layout"
};
</script>
<style scoped>
.custom-page-class {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: white;
}

.custom-page-class > .main-content {
    display: flex;
    justify-content: center;
    align-items: center;
}

.custom-page-class > .main-content > .card-wrapper {
    width: 60vw;
    height: 40vh;
    min-width: 600px;
    height: 400px;
    border-radius: 0.16rem;
    background-color: #f6f7f9;
}
</style>
