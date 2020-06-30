<template>
    <div class="bg">

        <div class="drag">like window</div>

    </div>
</template>

<script>
export default {
    name: 'home'
};
</script>
<style  scoped>
.bg {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    z-index: 1;
    background-image: url(../public/kobe.jpg);
    background-size: cover;
}

.bg:after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: inherit;
    filter: blur(3px);
    z-index: 1;
}

.drag {
    width: 40vw;
    height: ;
    text-align: center;
    background: inherit;
    z-index: 11;
    box-shadow: 0 0 10px 6px rgba(0, 0, 0, 0.5);
}
</style>
