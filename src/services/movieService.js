import axios from 'axios'

// API 키 관리
const getApiKey = () => {
  // const apiKey = localStorage.getItem('TMDb-Key')
  console.log('전체 환경변수:', process.env)  // 모든 환경변수 출력
  const apiKey = process.env.VUE_APP_TMDB_API_KEY
  console.log('환경변수 전체:', process.env.NODE_ENV) // 디버깅용
  console.log('TMDB API KEY:', apiKey) // 디버깅용
  if (!apiKey) {
    throw new Error('TMDB API 키가 환경 변수에 설정되지 않았습니다.')
  }
  return apiKey
}

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    language: 'ko-KR'
  }
})

// 요청 인터셉터 설정
apiClient.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      api_key: getApiKey()
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// API 에러 처리
const handleApiError = (error) => {
  if (error.response) {
    console.error('API 에러:', error.response.data)
    // if (error.response.status === 401) {
    //   localStorage.removeItem('TMDb-Key')
    // }
  }
  throw error
}

// 영화 서비스 객체
export const movieService = {
  async getMovies(page = 1, filters = {}) {
    try {
      const { sort_by = 'popularity.desc', year, genre, vote_average } = filters
      const params = {
        page,
        sort_by,
        ...(year && { primary_release_year: year }),
        ...(genre && { with_genres: genre }),
        ...(vote_average && { 'vote_average.gte': vote_average })
      }
      return await apiClient.get('/discover/movie', { params })
    } catch (error) {
      return handleApiError(error)
    }
  },

  // 상세 정보 조회 메서드 수정
  async getMovieDetails(movieId) {
    if (!movieId) {
      throw new Error('영화 ID가 필요합니다.');
    }
    try {
      const response = await apiClient.get(`/movie/${movieId}`, {
        params: {
          append_to_response: 'videos,credits,similar,images'
        }
      });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // 영화 크레딧(출연진, 제작진) 정보
  async getMovieCredits(movieId) {
    if (!movieId) {
      throw new Error('영화 ID가 필요합니다.');
    }
    try {
      const response = await apiClient.get(`/movie/${movieId}/credits`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  async getPopularMovies(page = 1) {
    try {
      return await apiClient.get('/movie/popular', { params: { page } })
    } catch (error) {
      return handleApiError(error)
    }
  },

  async getNowPlayingMovies(page = 1) {
    try {
      return await apiClient.get('/movie/now_playing', { params: { page } })
    } catch (error) {
      return handleApiError(error)
    }
  },

  async getTopRatedMovies(page = 1) {
    try {
      return await apiClient.get('/movie/top_rated', { params: { page } })
    } catch (error) {
      return handleApiError(error)
    }
  },

  async getUpcomingMovies(page = 1) {
    try {
      return await apiClient.get('/movie/upcoming', { params: { page } })
    } catch (error) {
      return handleApiError(error)
    }
  },

  async getMovieRatings() {
    try {
      const response = await this.getMovies(1, { sort_by: 'vote_average.desc' })
      return response.data.results.map(movie => movie.vote_average)
    } catch (error) {
      return handleApiError(error)
    }
  },

  async getGenres() {
    try {
      const response = await apiClient.get('/genre/movie/list')
      return response.data.genres
    } catch (error) {
      console.error('장르 목록 가져오기 실패:', error)
      return DEFAULT_GENRES
    }
  },

  // 비슷한 영화 추천
  async getSimilarMovies(movieId) {
    if (!movieId) {
      throw new Error('영화 ID가 필요합니다.');
    }
    try {
      const response = await apiClient.get(`/movie/${movieId}/similar`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
}

// 기본 장르 목록 (폴백용)
export const DEFAULT_GENRES = [
  { id: 28, name: '액션' },
  { id: 12, name: '모험' },
  { id: 16, name: '애니메이션' },
  { id: 35, name: '코미디' },
  { id: 80, name: '범죄' },
  { id: 99, name: '다큐멘터리' },
  { id: 18, name: '드라마' },
  { id: 10751, name: '가족' },
  { id: 14, name: '판타지' },
  { id: 36, name: '역사' },
  { id: 27, name: '공포' },
  { id: 10402, name: '음악' },
  { id: 9648, name: '미스터리' },
  { id: 10749, name: '로맨스' },
  { id: 878, name: 'SF' },
  { id: 10770, name: 'TV 영화' },
  { id: 53, name: '스릴러' },
  { id: 10752, name: '전쟁' },
  { id: 37, name: '서부' }
]

// 기본 export와 named export 둘 다 제공
export default movieService