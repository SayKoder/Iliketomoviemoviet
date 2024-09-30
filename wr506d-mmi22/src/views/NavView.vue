<script>
</script>

<template>
    <div class="wrapper">

        <nav>
            <ul>
                <li><router-link to="/" exact>Accueil</router-link></li>
                <li><router-link to="/movies">Movies</router-link></li>
                <li><router-link to="/">Actor</router-link></li>
                <li><router-link to="/">Catégories</router-link></li>
                <li><router-link to="/">Profil</router-link></li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    border-radius: 70px;
    background-color: #f3f3f3;
    border-bottom: 4px solid #b2b2b2;
}

nav ul {
    display: flex;
    flex-direction: row;
    gap: 40px;
    list-style-type: none;
    padding: 0;
    margin: 0;
}

nav ul li {
    display: inline;
}

nav ul li:last-child {
    margin-left: auto;
}

.wrapper .logo {
    margin-right: 20px; 
}

</style>