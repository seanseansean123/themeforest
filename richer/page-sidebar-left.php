<?php
/*
Template Name: Page: Sidebar Left
*/
?>

<?php get_header(); ?>

<?php get_template_part( 'framework/inc/titlebar' ); ?>

<div id="page-wrap" class="container">

	<div id="content" class="sidebar-left span9">
	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
			
		<article class="post" id="post-<?php the_ID(); ?>">
		
			<div class="entry">

				<?php the_content(); ?>

				<?php wp_link_pages(array('before' => 'Pages: ', 'next_or_number' => 'number')); ?>

			</div>

		</article>
		
		<?php if(!$options_data['check_disablecomments']) { ?>
			<?php comments_template(); ?>
		<?php } ?>

		<?php endwhile; endif; ?>
	</div> <!-- end content -->

	<?php get_sidebar(); ?>
	
</div> <!-- end page-wrap -->
	
<?php get_footer(); ?>
