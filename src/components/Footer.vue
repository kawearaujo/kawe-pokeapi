<template>
    <footer>
        <a class="socialLink" href="https://www.instagram.com/kawe_semsobrenome/" target="_blank">
            <img src="https://raw.githubusercontent.com/william-costa/wdev-mock-site-resources/master/assets/icons/instagram.svg" alt="socialLink.label" title="socialLink.label">
        </a>
        <a class="socialLink" href="https://wa.me/+5574988189677" target="_blank">
            <img src="../assets/img/whatsapp.png" alt="facebook" title="facebook">
        </a>
        <a class="socialLink" href="https://www.linkedin.com/in/kawearaujo/" target="_blank">
            <img src="../assets/img/linkedin.png" alt="socialLink.label" title="socialLink.label">
        </a>
        <p>Todos Direitos Garantidos a Kawe, 2023</p>
    </footer>
</template>

<script>


export default{
    name: 'FooterBar',
    data(){
        return {
            socialLinks:[]
        }
    },
    
}
</script>

<style scoped>
    footer{
        width: 100%;
        height:8vh ;
        background-color: var(--color-background-nav);
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        bottom: 0;
    }
    .socialLink{
        /* border: 2px solid var(--color-text-light); */
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
        width: 30px;
        height: 30px;
        margin:0 10px;
    }
    .socialLink img{
        width: 20px;
    }
    p{
        font-weight: 600;
        color: white;
        font-size: 12px;
    }
</style>