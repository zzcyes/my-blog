<template>
    <div class="custom-page-class bg-blur">
        <main class="main-content">
            <div class="card-wrapper">
                <h1>zzcyes'blog</h1>
                <div class="article">
                    <div class="zh">
                        <p>悟已往之不谏，</p>
                        <p>知来者之可追。</p>
                        <p>实迷途其未远，</p>
                        <p>觉今是而昨非。</p>
                    </div>

                    <div class="en">
                        <p>Fret not over bygones</p>
                        <p> and the forward journey take.</p>
                        <p>Only a short distance have I gone astray,</p>
                        <p>and I know today I am right,</p>
                        <p>if yesterday was a complete mistake.</p>
                    </div>
                </div>

                <ul class="button-group">
                    <li class="tag">Home</li>
                    <li class="tag">Catalogue</li>
                    <li class="tag">Github</li>
                </ul>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    name: 'home-layout'
};
</script>
<style  scoped>
li {
    list-style: none;
}

.custom-page-class {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #dedede;
    overflow: hidden;
}

.custom-page-class > .main-content {
    display: flex;
    justify-content: center;
    align-items: center;
}

.custom-page-class > .main-content > .card-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60vw;
    height: 40vw;
}

.button-group {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
}

.tag {
    display: inline-block;
    color: black;
    padding: 10px 15px;
    border-radius: 50px;
    background: #dedede;
    box-shadow: 16px 16px 33px #bdbdbd, -16px -16px 33px #ffffff;
}

.article {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
}

.zh {
    text-align: left;
}

.en {
    text-align: right;
}
</style>
