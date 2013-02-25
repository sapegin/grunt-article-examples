// Обязательная обёртка
module.exports = function(grunt) {

	// Задачи
	grunt.initConfig({
		// Склеиваем
		concat: {
			main: {
				src: [
					'js/libs/jquery.js',
					'js/utils.js',
					'js/main.js'
					// 'js/**/*.js'  // Все JS-файлы в папке
				],
				dest: 'build/scripts.js'
			}
		},
		// Сжимаем
		uglify: {
			main: {
				files: {
					// Результат задачи concat
					'build/scripts.min.js': '<%= concat.main.dest %>'
				}
			}
		},
		// JSHint
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			files: 'js/*.js'
		},
		// Следим за изменениями файлов
		watch: {
			concat: {
				files: '<%= concat.main.src %>',
				tasks: 'concat'  // Можно несколько: ['lint', 'concat']
			}
		},
		// Веб-сервер
		connect: {
			test: {
				options: {
					port: 8000,
					base: '.'
				}
			}
		}
	});
	
	// Загрузка плагинов, установленных с помощью npm install
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	// Или вручную
	// grunt.loadNpmTasks('grunt-contrib-concat');
	// grunt.loadNpmTasks('grunt-contrib-uglify');
	// ...
	
	// Задача по умолчанию
	grunt.registerTask('default', ['concat', 'uglify']);
};