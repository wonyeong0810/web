// 검색 버튼 클릭 이벤트 리스너 추가
// 'searchButton' ID를 가진 요소에 클릭 이벤트 리스너를 추가합니다.
document.getElementById('searchButton').addEventListener('click', function() {
    // 'searchInput' ID를 가진 입력 요소의 값을 가져옵니다.
    const searchInput = document.getElementById('searchInput').value;
    // 영화 검색 함수 호출, 사용자가 입력한 검색어를 인수로 전달합니다.
    searchMovies(searchInput);
});

// 영화 검색 함수 정의
// 사용자의 검색어를 받아 OMDB API를 호출하고 결과를 처리합니다.
function searchMovies(query) {
    // OMDB API 키 설정 (실제 API 키로 대체해야 합니다)
    const apiKey = 'a1652821';
    // OMDB API 호출, 사용자의 검색어와 API 키를 포함한 URL을 생성합니다.
    fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`)
        .then(response => response.json()) // 응답을 JSON 형식으로 파싱합니다.
        .then(data => {
            // 응답 데이터의 'Response' 필드가 "True"인지 확인합니다.
            if (data.Response === "True") {
                // 검색 결과가 있을 경우, 영화 목록을 화면에 표시하는 함수 호출
                displayMovies(data.Search);
            } else {
                // 검색 결과가 없을 경우, 사용자에게 메시지를 표시합니다.
                document.getElementById('movieList').innerHTML = '<p>영화를 찾을 수 없습니다.</p>';
            }
        })
        // API 호출 중 오류가 발생할 경우, 오류 메시지를 콘솔에 출력합니다.
        .catch(error => console.error('Error:', error));
}

// 영화 목록을 화면에 표시하는 함수 정의
// 검색 결과로 받은 영화 목록을 화면에 동적으로 생성하여 표시합니다.
function displayMovies(movies) {
    // 'movieList' ID를 가진 요소를 가져옵니다.
    const movieList = document.getElementById('movieList');
    // 영화 리스트 요소의 내용을 초기화합니다.
    movieList.innerHTML = '';
    // 영화 배열을 순회하며 각 영화 정보를 화면에 표시합니다.
    movies.forEach(movie => {
        // 새 div 요소를 생성하여 영화 정보를 포함합니다.
        const movieElement = document.createElement('div');
        // 'movie' 클래스를 새 div 요소에 추가합니다.
        movieElement.classList.add('movie');
        // 영화 정보를 포함하는 HTML 구조를 설정합니다.
        movieElement.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/100'}" alt="${movie.Title}">
            <div>
                <h2>${movie.Title}</h2>
                <p>년도: ${movie.Year}</p>
                <p>타입: ${movie.Type}  </p>
            </div>
        `;
        // 생성한 영화 요소를 영화 리스트 요소에 추가합니다.
        movieList.appendChild(movieElement);
    });
}
