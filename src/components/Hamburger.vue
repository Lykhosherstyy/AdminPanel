<template>
	<div>
		<button class="hamburger hamburger--arrow" :class="{'is-active':isActive}" type="button" @click="toggleClick">
			<span class="hamburger-box">
				<span class="hamburger-inner"></span>
			</span>
		</button>
	</div>
</template>

<script>
    export default {
        name: "Hamburger",
        props: {
            isActive: {
                type: Boolean,
                default: false
            },
            toggleClick: {
                type: Function,
                default: null
            }
        },
    }
</script>

<style lang="scss" scoped>
	.hamburger-container{
		display: inline-block;
	}
	.hamburger {
		height: 50px;
		padding: 10px 10px;
		display: inline-block;
		cursor: pointer;
		outline: none;
		transition-property: opacity, filter;
		transition-duration: 0.15s;
		transition-timing-function: linear;

		// Normalize (<button>)
		font: inherit;
		color: inherit;
		text-transform: none;
		background-color: transparent;
		border: 0;
		margin: 0;
		overflow: visible;
		line-height: 0;

		&:hover {
			opacity:  0.7;
		}

		&.is-active {
			&:hover {
				opacity: 0.7;
			}

			.hamburger-inner,
			.hamburger-inner::before,
			.hamburger-inner::after {
				background-color: #000;
			}
		}
	}

	.hamburger-box {
		width: 24px;
		height: 16px;
		display: inline-block;
		position: relative;
	}

	.hamburger-inner {
		display: block;
		top: 50%;
		margin-top: -1px;

		&,
		&::before,
		&::after {
			width: 24px;
			height:2px;
			background-color:  #000;
			border-radius: 4px;
			position: absolute;
			transition-property: transform;
			transition-duration: 0.15s;
			transition-timing-function: ease;
		}

		&::before,
		&::after {
			content: "";
			display: block;
		}

		&::before {
			top: -6px;
		}

		&::after {
			bottom: -6px;
		}
	}
	.hamburger--arrow.is-active {
		.hamburger-inner {
			&::before {
				transform: translate3d(-8px, 0, 0) rotate(-45deg) scale(0.7, 1);
			}

			&::after {
				transform: translate3d(-8px, 0, 0) rotate(45deg) scale(0.7, 1);
			}
		}
	}
</style>